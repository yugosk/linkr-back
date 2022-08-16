import connection from "../databases/pgsql.js";

export async function findFollow(followedId, followerId) {
  return connection.query(
    'SELECT * FROM followers WHERE "followedId" = $1 AND "followerId" = $2',
    [followedId, followerId]
  );
}

export async function createFollow(followedId, followerId) {
  return connection.query(
    'INSERT INTO followers ("followedId", "followerId") VALUES ($1, $2)',
    [followedId, followerId]
  );
}

export async function deleteFollow(followedId, followerId) {
  return connection.query(
    'DELETE FROM followers WHERE "followedId" = $1 AND "followerId" = $2',
    [followedId, followerId]
  );
}
