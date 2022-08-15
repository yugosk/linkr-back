import { createPost, readPosts } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function newPost(req, res) {
  const { url, description } = req.body;
  const { id } = res.locals.userData;
  const postData = {
    url,
    description,
    userId: id,
  };
  try {
    await createPost(postData);
    res.status(201).send("Post created successfully");
  } catch {
    res.sendStatus(500);
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

export async function getPosts(req, res) {
  try {
    const posts = await readPosts();
    const response = await Promise.all(posts.map((post) => mapMetadata(post)));
    res.send(response);
  } catch {
    res.sendStatus(500);
  }
}
