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

export async function findUsers(name) {
  let pattern = "";
  const params = [];

  if (name) {
    params.push(`${name}%`);
    pattern = "WHERE username ILIKE $1";
  }

  return connection.query(
    `SELECT id, username, picture FROM users ${pattern} ORDER BY username`,
    params
  );
}
