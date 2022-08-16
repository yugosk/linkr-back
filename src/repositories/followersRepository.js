import connection from "../databases/pgsql.js";

export async function findFollow(query) {
  const params = [];

  const whereClause = Object.entries(query).reduce((prev, cur) => {
    params.push(cur[1]);
    return `${prev}${prev === "" ? "WHERE" : "AND"} "${cur[0]}" = $${
      params.length
    } `;
  }, "");

  return connection.query(`SELECT * FROM followers ${whereClause}`, params);
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
