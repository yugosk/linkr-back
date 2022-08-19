import {
  trendingHashtags,
  postsWithTag,
  postsWithTagOffset,
} from "../repositories/tagsRepository.js";
import { readLikes } from "../repositories/postsRepository.js";

export async function trending(req, res) {
  try {
    const listTrendig = await trendingHashtags();
    res.status(200).send(listTrendig);
  } catch (error) {
    res.status(500).send("Unable to obtain trending hashtags");
  }
}

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

export async function hashtagPage(req, res) {
  const { hashtag } = req.params;
  if (!hashtag) {
    return res.sendStatus(404);
  }
  const { offset } = req.query;

  if (offset) {
    try {
      const listPosts = await postsWithTagOffset(hashtag, offset);
      const response = await Promise.all(
        listPosts.map((post) => mapMetadata(post))
      );
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Unable to obtain posts for hashtag");
    }
  } else {
    try {
      const listPosts = await postsWithTag(hashtag);
      const response = await Promise.all(
        listPosts.map((post) => mapMetadata(post))
      );
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Unable to obtain posts for hashtag");
    }
  }
}
