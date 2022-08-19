import connection from "../databases/pgsql.js";

export async function findPost(postId) {
  return connection.query("SELECT * FROM posts WHERE id = $1", [postId]);
}

export async function createPost(post) {
  const { url, description, userId } = post;
  const { rows: response } = await connection.query(
    `INSERT INTO posts (url, description, "userId", "createdAt") VALUES ($1, $2, $3, NOW()) RETURNING id`,
    [url, description, userId]
  );
  return response[0].id;
}

export async function readPosts(userId) {
  const { rows: response } = await connection.query(
    `
  SELECT p.id, p.url, p.description, p."userId" AS "postOwner", u.picture, u.username, false AS "isRepost", null AS "repostOwner", null AS "repostUsername", 
	(SELECT COUNT(reposts.id) FROM reposts WHERE reposts."postId" = p.id)AS reposts,
	(SELECT COUNT(c.id) FROM comments c WHERE c."postId" = p.id) AS comments,
	ARRAY((SELECT jsonb_build_object('userId', users.id, 'username', users.username) FROM likes JOIN users ON users.id = likes."userId" WHERE likes."postId" = p.id)) AS likes,
	EXISTS (SELECT * FROM likes WHERE likes."postId" = p.id AND likes."userId" = $1) AS "isLiked",
	p."createdAt"
  FROM posts p
  JOIN users u ON u.id = p."userId"
  LEFT JOIN likes l ON l."postId" = p.id
  WHERE p."userId" = ANY(SELECT f."followedId" FROM followers f WHERE f."followerId" = $1) 
	OR p."userId" = $1
  UNION
  SELECT p.id, p.url, p.description, p."userId" AS "postOwner", u.picture, u.username, true AS "isRepost", r."userId" AS "repostOwner", u2.username AS "repostUsername", 
	(SELECT COUNT(reposts.id) FROM reposts WHERE reposts."postId" = p.id) AS reposts,
	(SELECT COUNT(c.id) FROM comments c WHERE c."postId" = p.id) AS comments,
	ARRAY((SELECT jsonb_build_object('userId', users.id, 'username', users.username) FROM likes JOIN users ON users.id = likes."userId" WHERE likes."postId" = p.id)) AS likes,
	EXISTS (SELECT * FROM likes WHERE likes."postId" = p.id AND likes."userId" = $1) AS "isLiked",
	r."createdAt"
  FROM posts p
  JOIN users u ON u.id = p."userId"
  JOIN reposts r ON r."postId" = p.id 
  LEFT JOIN likes l ON l."postId" = p.id
  JOIN users u2 ON r."userId" = u2.id 
  WHERE r."userId" = ANY(SELECT f."followedId" FROM followers f WHERE f."followerId" = $1) 
  OR r."userId" = $1
  ORDER BY "createdAt" DESC
  LIMIT 10
  `,
    [userId]
  );
  return response;
}

export async function readOffsetPosts(userId, offset) {
  const { rows: response } = await connection.query(
    `
    SELECT p.id, p.url, p.description, p."userId" AS "postOwner", u.picture, u.username, false AS "isRepost", null AS "repostOwner", null AS "repostUsername", 
    (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."postId" = p.id)AS reposts,
    (SELECT COUNT(c.id) FROM comments c WHERE c."postId" = p.id) AS comments,
    ARRAY((SELECT jsonb_build_object('userId', users.id, 'username', users.username) FROM likes JOIN users ON users.id = likes."userId" WHERE likes."postId" = p.id)) AS likes,
    EXISTS (SELECT * FROM likes WHERE likes."postId" = p.id AND likes."userId" = $1) AS "isLiked",
    p."createdAt"
    FROM posts p
    JOIN users u ON u.id = p."userId"
    LEFT JOIN likes l ON l."postId" = p.id
    WHERE p."userId" = ANY(SELECT f."followedId" FROM followers f WHERE f."followerId" = $1) 
    OR p."userId" = $1
    UNION
    SELECT p.id, p.url, p.description, p."userId" AS "postOwner", u.picture, u.username, true AS "isRepost", r."userId" AS "repostOwner", u2.username AS "repostUsername", 
    (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."postId" = p.id) AS reposts,
    (SELECT COUNT(c.id) FROM comments c WHERE c."postId" = p.id) AS comments,
    ARRAY((SELECT jsonb_build_object('userId', users.id, 'username', users.username) FROM likes JOIN users ON users.id = likes."userId" WHERE likes."postId" = p.id)) AS likes,
    EXISTS (SELECT * FROM likes WHERE likes."postId" = p.id AND likes."userId" = $1) AS "isLiked",
    r."createdAt"
    FROM posts p
    JOIN users u ON u.id = p."userId"
    JOIN reposts r ON r."postId" = p.id 
    LEFT JOIN likes l ON l."postId" = p.id
    JOIN users u2 ON r."userId" = u2.id 
    WHERE r."userId" = ANY(SELECT f."followedId" FROM followers f WHERE f."followerId" = $1) 
    OR r."userId" = $1
    ORDER BY "createdAt" DESC
    OFFSET $2
    LIMIT 10
  `,
    [userId, offset]
  );
  return response;
}

export async function readLikes(postId) {
  const { rows: response } = await connection.query(
    `
  SELECT u.username, u.id AS "userId", "postId" FROM likes
  JOIN users u ON u.id = "userId"
  WHERE "postId" = $1
  `,
    [postId]
  );
  return response;
}
