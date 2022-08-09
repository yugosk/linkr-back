import connection from "../databases/pgsql.js";

export async function trendingHashtags(){
    return connection.query('SELECT tags.id as "tagId", tags.name as "trendingTags", count("tagsPosts".postId) as "numUses" FROM "tagsPosts" JOIN tags ON "tagsPosts"."tagId" = tags.Id GROUP BY tags.id ,tags.name ORDER BY "numUses" desc LIMIT 10')
}

export async function postsWithTag(tagName){
    const listPosts = connection.query('SELECT * FROM posts JOIN "tagsPosts" ON posts.id="tagsPosts"."postId" WHERE "tagName"=$1',[tagName]);
    return (listPosts);
}
