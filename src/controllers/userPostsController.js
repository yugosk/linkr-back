import { postsOfUser } from "../repositories/userPostsRepository.js";

export async function userPage(req,res){
    const { id } = req.params;
    if (!id){
        return res.sendStatus(404);
    }
    try{
        const listPosts  = await postsOfUser(id);
        res.status(200).send(listPosts);
    }
    catch(error){
        res.status(500).send('Unable to obtain posts for user');
    }
}