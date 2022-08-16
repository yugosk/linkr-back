import connection from "../databases/pgsql.js";

export async function findFollow(whereParams) {
  const params = [];

  const whereClause = Object.entries(whereParams).reduce((prev, cur) => {
    params.push(cur[1]);
    return `${prev}${prev === "" ? "WHERE" : "AND"} "${cur[0]}" = $${
      params.length
    } `;
  }, "");

  return connection.query(`SELECT * FROM followers ${whereClause}`, params);
}

export async function createFollow(followedId, followerId) {
  return connection.query(
    'INSERT INTO followers ("followedId", "followerId") VALUES ($1, $2) RETURNING id',
    [followedId, followerId]
  );
}

export async function deleteFollow(id) {
  return connection.query("DELETE FROM followers WHERE id = $1", [id]);
}
