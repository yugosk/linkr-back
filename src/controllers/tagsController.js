import { trendingHashtags, tagPage } from "../repositories/tagsRepository";

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
    const { tagId } = req.body;
    try{
        const objPageHashtag  = await tagPage(tagId);
        res.status(201).send(objPageHashtag);
    }
    catch(error){
        res.status(500).send('Unable to obtain posts for hashtag');
    }
}