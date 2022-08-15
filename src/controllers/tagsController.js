import { trendingHashtags, postsWithTag } from "../repositories/tagsRepository.js";

export async function trending(req,res){
    try{
        const listTrendig = await trendingHashtags();
        res.status(200).send(listTrendig);
    }
    catch(error){
        res.status(500).send('Unable to obtain trending hashtags');
    }

}

async function mapMetadata(obj) {
    try {
      const meta = await urlMetadata(obj.url);
      return {
        username: obj.username,
        picture: obj.picture,
        description: obj.description,
        url: obj.url,
        postOwner: obj.userId,
        metaTitle: meta.title,
        metaImage: meta.image,
        metaDescription: meta.description,
      };
    } catch {
      return {
        username: obj.username,
        picture: obj.picture,
        description: obj.description,
        url: obj.url,
        postOwner: obj.userId,
        metaTitle: "Metadata not available",
        metaImage: "Metadata not available",
        metaDescription: "Metadata not available",
      };
    }
  }

export async function hashtagPage(req,res){
    const { hashtag } = req.params;
    if (!hashtag){
        return res.sendStatus(404);
    }
    try{
        const listPosts  = await postsWithTag(hashtag);
        const response = await Promise.all(listPosts.map((post) => mapMetadata(post)));
        res.status(200).send(response);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Unable to obtain posts for hashtag');
    }
}