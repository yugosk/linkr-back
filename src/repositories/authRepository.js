import connection from "../databases/pgsql.js";

export async function findUser(email, username) {
  return connection.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );
}

export async function createUser(email, password, username, picture) {
  connection.query(
    "INSERT INTO users (email, password, username, picture) VALUES ($1, $2, $3, $4)",
    [email, password, username, picture]
  );
}
