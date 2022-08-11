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
  SELECT p.url, p.description, u.picture, u.username FROM posts p
  JOIN users u ON u.id = p."userId"
  ORDER BY p."createdAt" DESC
  LIMIT 20
  `);
  return response;
}
