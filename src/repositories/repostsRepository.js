import connection from "../databases/pgsql.js";

export async function createRepost(postId, userId) {
  await connection.query(
    `
    INSERT INTO reposts ("postId", "userId") VALUES ($1, $2)
     `,
    [postId, userId]
  );
}

export async function deleteRepost(postId, userId) {
  await connection.query(
    `
    DELETE FROM reposts WHERE "postId" = $1 AND "userId" = $2
    `,
    [postId, userId]
  );
}
