import connection from "../databases/pgsql.js";

export async function createPost(post) {
  const { url, description, userId } = post;
  const { rows: response } = await connection.query(
    `INSERT INTO posts (url, description, "userId", "createdAt") VALUES ($1, $2, $3, NOW()) RETURNING id`,
    [url, description, userId]
  );
  return response[0].id;
}

export async function readPosts() {
  const { rows: response } = await connection.query(`
  SELECT p.url, p.description, u.picture, u.username, p.id, p."userId" FROM posts p
  JOIN users u ON u.id = p."userId"
  ORDER BY p."createdAt" DESC
  LIMIT 20
  `);
  return response;
}

export async function readFollowedPosts(userId) {
  const { rows: response } = await connection.query(
    `
  SELECT p.url, p.description, u.picture, u.username, p.id, p."userId" FROM posts p
  JOIN users u ON u.id = p."userId"
  JOIN followers f ON f."followedId"=p."userId"
  WHERE "followerId" = $1 OR "followedId" = $1
  ORDER BY p."createdAt" DESC
  `,
    [userId]
  );
  return response;
}

export async function readLikes() {
  const { rows: response } = await connection.query(
    `
  SELECT u.username, u.id, "postId" FROM likes
  JOIN users u ON u.id = "userId"
  `
  );
  return response;
}
