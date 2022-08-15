import connection from "../databases/pgsql.js";

export async function postsOfUser(userId){
    const { rows:listPosts } = await connection.query(
    `SELECT users.picture, users.username, posts.id, posts.url, posts.description, posts."userId", posts."createdAt" FROM posts 
    JOIN users ON users.id = posts."userId"
    WHERE posts."userId"=$1`,[userId]);
    const { rows:userData } = await connection.query('SELECT username, picture FROM users WHERE id=$1',[userId]);
    const objUser = {listPosts};
    return (objUser);
}