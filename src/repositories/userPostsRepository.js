import connection from "../databases/pgsql.js";

export async function postsOfUser(userId){
    const { rows:listPosts } = await connection.query('SELECT posts.id, posts.url, posts.description, posts."userId", posts."createdAt" FROM posts WHERE posts."userId"=$1',[userId]);
    const { rows:userData } = await connection.query('SELECT username, picture FROM users WHERE id=$1',[userId]);
    const objUser = {username:userData[0].username,
                    picture:userData[0].picture,
                    listPosts};
    return (objUser);
}