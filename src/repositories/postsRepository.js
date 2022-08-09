import connection from "../databases/pgsql.js";

export async function createPost(post) {
  const { url, description, userId } = post;
  await connection.query(
    `INSERT INTO posts (url, description, "userId", "createdAt") VALUES ($1, $2, $3, NOW())`,
    [url, description, userId]
  );
}
