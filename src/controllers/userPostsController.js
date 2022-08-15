import { response } from "express";
import { postsOfUser } from "../repositories/userPostsRepository.js";

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

export async function userPage(req,res){
    const { id } = req.params;
    if (!id){
        return res.sendStatus(404);
    }
    try{
        const list  = await postsOfUser(id);
        const {listPosts} = list;
        const response = await Promise.all(listPosts.map((post) => mapMetadata(post)));
        res.status(200).send(response);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Unable to obtain posts for user');
    }
}