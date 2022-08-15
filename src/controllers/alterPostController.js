import { checkOwner, edit, exclude } from "../repositories/alterPostRepository.js";

export async function editPost(req,res){
    const { postId, newDescription } = req.body;
    let { id } = res.locals.userData;
    try {
        let { userId } = await checkOwner(postId);
        userId = parseInt(userId);
        id = parseInt(id);
        if (userId !== id){
            return res.status(401).send('Post does not belong to user');
        }
        await edit(postId,newDescription);
        res.status(200).send("Post edited");
    }catch(err){
        res.status(500).send("Unable to edit post");
    } 

}

export async function deletePost(req,res){
    const { postId } = req.params;
    if (!postId){
        return res.sendStatus(404);
    }
    let { id } = res.locals.userData;
    try {
        let {userId} = await checkOwner(postId);
        userId = parseInt(userId);
        id = parseInt(id);
        if (userId !== id){
            return res.status(401).send('Post does not belong to user');
        }
        await exclude(postId);
        res.status(200).send("Post deleted");
    }catch(err){
        res.status(500).send("Unable to delete post");
    } 

}