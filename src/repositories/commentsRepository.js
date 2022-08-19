import connection from "../databases/pgsql.js";

export async function getComments(userId, postId) {
  return connection.query(
    `
    SELECT c.id, u.username, c."userId", u.picture, c.text, 
    exists (SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = c.id),
    case when p."userId" = c."userId" then true else false end as "isOwner"
    FROM comments c
    JOIN users u ON u.id = c."userId"
    JOIN posts p ON p.id = c."postId"
    WHERE "postId" = $2
    ORDER BY c.id
    `,
    [userId, postId]
  );
}

export async function createComment(postId, userId, text) {
  return connection.query(
    `INSERT INTO comments ("postId", "userId", text) VALUES ($1, $2, $3)`,
    [postId, userId, text]
  );
}
