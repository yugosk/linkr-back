import connection from "../databases/pgsql.js";

export async function postsOfUser(userId) {
  const { rows: listPosts } = await connection.query(
    `SELECT users.picture, users.username, posts.id, posts.url, posts.description, posts."userId", posts."createdAt" FROM posts 
    JOIN users ON users.id = posts."userId"
    WHERE posts."userId"=$1
    ORDER BY posts."createdAt"
    LIMIT 10`,
    [userId]
  );
  return listPosts;
}

export async function postsOfUserOffset(userId, offset) {
  const { rows: listPosts } = await connection.query(
    `
    SELECT users.picture, users.username, posts.id, posts.url, posts.description, posts."userId", posts."createdAt" FROM posts 
    JOIN users ON users.id = posts."userId"
    WHERE posts."userId"=$1
    ORDER BY posts."createdAt"
    OFFSET $2
    LIMIT 10
    `,
    [userId, offset]
  );
  return listPosts;
}
