import { createPost, readPosts } from "../repositories/postsRepository.js";
import {
  createTag,
  createTagsPosts,
  readTags,
  testandoDB,
} from "../repositories/tagsRepository.js";
import urlMetadata from "url-metadata";

export async function newPost(req, res) {
  const { url, description } = req.body;
  const { id } = res.locals.userData;
  const postData = {
    url,
    description,
    userId: id,
  };
  const descriptionArray = description.split(" ");
  const tags = descriptionArray
    .map((i) => {
      if (i.charAt(0) === "#") {
        return i.slice(1);
      }
    })
    .filter((i) => {
      if (i) {
        return i;
      }
    });

  try {
    const postId = await createPost(postData);
    if (tags.length === 0) {
      return res.status(201).send("Post created successfully");
    } else {
      for (let i = 0; i < tags.length; i++) {
        const tagCheck = await readTags(tags[i]);
        if (tagCheck.length === 0) {
          const tagId = await createTag(tags[i]);
          await createTagsPosts(tagId, postId);
        } else {
          await createTagsPosts(tagCheck[0].id, postId);
        }
      }
      return res.status(201).send("Post created successfully");
    }
  } catch (error) {
    console.error(error);
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
    console.log(await testandoDB());
    res.send(response);
  } catch {
    res.sendStatus(500);
  }
}
