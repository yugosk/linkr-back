import connection from "../databases/pgsql.js";

export async function findUser(email) {
  return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export async function createUser(email, password, username, picture) {
  connection.query(
    "INSERT INTO users (email, password, username, picture) VALUES ($1, $2, $3, $4)",
    [email, password, username, picture]
  );
}
