import connection from "../databases/pgsql.js";

export async function createComment(postId, userId, text) {
  return connection.query(
    `INSERT INTO comments ("postId", "userId", text) VALUES ($1, $2, $3)`,
    [postId, userId, text]
  );
}
