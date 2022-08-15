import connection from "../databases/pgsql.js";

export async function checkOwner(postId){
    const { rows } = await connection.query('SELECT "userId" FROM posts WHERE id=$1',
    [postId]);
    return rows[0];
} 

export async function edit(postId,text) {
    return await connection.query(
    'UPDATE posts SET description=$1 WHERE id = $2',
    [text,postId]
    );
}

export async function exclude(postId) {
    await connection.query('DELETE FROM "tagsPosts" WHERE "postId" = $1',
    [postId]);
    await connection.query('DELETE FROM likes WHERE "postId" = $1',
    [postId]);
    await connection.query(
    'DELETE FROM posts WHERE id = $1',
    [postId]);
    return;
}