import connection from "../databases/pgsql.js";

export async function trendingHashtags() {
  const { rows: listTrending } = await connection.query(
    'SELECT tags.id as "tagId", tags.name as "trendingTags", count("tagsPosts"."postId") as "numUses" FROM "tagsPosts" JOIN tags ON "tagsPosts"."tagId" = tags.Id GROUP BY tags.id ,tags.name ORDER BY "numUses" desc LIMIT 10'
  );
  return listTrending;
}

export async function readTags(name) {
  const { rows: response } = await connection.query(
    `
        SELECT id FROM tags WHERE name = $1
    `,
    [name]
  );
  return response;
}

export async function createTag(name) {
  const { rows: response } = await connection.query(
    `
    INSERT INTO tags (name) VALUES ($1) RETURNING id
    `,
    [name]
  );
  return response[0].id;
}

export async function createTagsPosts(tagId, postId) {
  await connection.query(
    `
    INSERT INTO "tagsPosts" ("tagId", "postId") VALUES ($1, $2)
    `,
    [tagId, postId]
  );
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

export async function testandoDB() {
  const { rows: response } = await connection.query(`
        SELECT * FROM tags;
    `);
  return response;
}