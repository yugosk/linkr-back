import connection from "../databases/pgsql.js";

export async function createLike(postId, userId) {
  await connection.query(
    `
    INSERT INTO likes ("postId", "userId") VALUES ($1, $2)
    `,
    [postId, userId]
  );
}

export async function deleteLike(postId, userId) {
  await connection.query(
    `
    DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2
    `,
    [postId, userId]
  );
}
