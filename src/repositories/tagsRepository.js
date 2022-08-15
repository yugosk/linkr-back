import connection from "../databases/pgsql.js";

export async function trendingHashtags(){
    const { rows:listTrending } = await connection.query('SELECT tags.id as "tagId", tags.name as "trendingTags", count("tagsPosts"."postId") as "numUses" FROM "tagsPosts" JOIN tags ON "tagsPosts"."tagId" = tags.Id GROUP BY tags.id ,tags.name ORDER BY "numUses" desc LIMIT 10')
    return listTrending;
}


export async function postsWithTag(tagName){
    const { rows:listPosts } = await connection.query(
    `SELECT users.picture, users.username, posts.id, posts.url, posts.description, posts."userId", posts."createdAt" FROM posts 
    JOIN "tagsPosts" ON posts.id="tagsPosts"."postId" 
    JOIN users on posts."userId"=users.id
    JOIN tags ON "tagsPosts"."tagId"=tags.id 
    WHERE tags.name=$1
    ORDER BY posts."createdAt" DESC
    LIMIT 20`,[tagName]);
    return (listPosts);
}