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

export async function hashtagPage(req,res){
    const { hashtag } = req.params;
    if (!hashtag){
        return res.sendStatus(404);
    }
    try{
        const listPosts  = await postsWithTag(hashtag);
        res.status(200).send(listPosts);
    }
    catch(error){
        res.status(500).send('Unable to obtain posts for hashtag');
    }
}