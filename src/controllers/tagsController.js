import { trendingHashtags, postsWithTag } from "../repositories/tagsRepository.js";

export async function trending(req,res){
    try{
        const listTrendig = await trendingHashtags();
        res.status(201).send(listTrendig);
    }
    catch(error){
        res.status(500).send('Unable to obtain trending hashtags');
    }

}

export async function hashtagPage(req,res){
    const { tagName } = req.params;
    try{
        const listPosts  = await postsWithTag(tagName);
        res.status(201).send(listPosts);
    }
    catch(error){
        res.status(500).send('Unable to obtain posts for hashtag');
    }
}