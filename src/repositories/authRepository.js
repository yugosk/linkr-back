import connection from "../databases/pgsql.js";

export async function findUser(email, username) {
  return connection.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );
}

export async function findUserByEmail(email) {
  return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export async function findUserById(id) {
  return connection.query("SELECT * FROM users WHERE id = $1", [id]);
}

export async function createUser(email, password, username, picture) {
  connection.query(
    "INSERT INTO users (email, password, username, picture) VALUES ($1, $2, $3, $4)",
    [email, password, username, picture]
  );
}

export async function findUsers(name, followerId) {
  return connection.query(
    `
    SELECT users.id, username, picture, 
    EXISTS (SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = users.id) AS "isFollowing"
    FROM users 
    WHERE username ILIKE $2
    ORDER BY "isFollowing" DESC, username
`,
    [followerId, `${name}%`]
  );
}
