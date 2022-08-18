//import { response } from "express";
import { postsOfUser } from "../repositories/userPostsRepository.js";
import { readLikes } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

async function mapMetadata(obj, userId) {
    const likes = await readLikes();
    const postLikes = likes
      .filter((i) => i.postId === obj.id)
      .map((i) => {
        return { username: i.username, userId: i.id };
      });
    let isLiked = false;
    if (postLikes.find((i) => i.userId === userId)) {
      isLiked = true;
    }
    try {
      const meta = await urlMetadata(obj.url);
      return {
        id: obj.id,
        username: obj.username,
        picture: obj.picture,
        description: obj.description,
        url: obj.url,
        postOwner: obj.userId,
        metaTitle: meta.title,
        metaImage: meta.image,
        metaDescription: meta.description,
        likes: postLikes,
        isLiked,
      };
    } catch {
      return {
        id: obj.id,
        username: obj.username,
        picture: obj.picture,
        description: obj.description,
        url: obj.url,
        postOwner: obj.userId,
        metaTitle: "Metadata not available",
        metaImage: "Metadata not available",
        metaDescription: "Metadata not available",
        likes: postLikes,
        isLiked,
      };
    }
  }

export async function userPage(req,res){
    let { id } = req.params;
    if (!id){
        return res.sendStatus(404);
    }
    id = parseInt(id);
    try{
        const list  = await postsOfUser(id);
        const response = await Promise.all(list.map((post) => mapMetadata(post)));
        res.status(200).send(response);
        //res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Unable to obtain posts for user');
    }
}