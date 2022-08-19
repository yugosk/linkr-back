import {
  createPost,
  readPosts,
  readLikes,
  readOffsetPosts,
  findPost,
} from "../repositories/postsRepository.js";
import { findFollow } from "../repositories/followersRepository.js";
import {
  createTag,
  createTagsPosts,
  readTags,
} from "../repositories/tagsRepository.js";
import urlMetadata from "url-metadata";
import { readReposts } from "../repositories/repostsRepository.js";
import {
  getComments,
  createComment,
} from "../repositories/commentsRepository.js";

export async function newPost(req, res) {
  const { url, description } = res.locals.sanitezedBody;
  const id = res.locals.userId;
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
  } catch {
    res.sendStatus(500);
  }
}

async function mapMetadata(obj, userId) {
  const likes = await readLikes(obj.id);
  const reposts = await readReposts(obj.id);
  let isLiked = false;
  if (likes.find((i) => i.userId === userId)) {
    isLiked = true;
  }
  let userReposted = false;
  if (reposts.find((i) => i.userId === userId)) {
    userReposted = true;
  }
  try {
    const meta = await urlMetadata(obj.url);
    return {
      id: obj.id,
      url: obj.url,
      description: obj.description,
      postOwner: obj.postOwner,
      picture: obj.picture,
      username: obj.username,
      isRepost: obj.isRepost,
      repostOwner: obj.repostOwner,
      repostUsername: obj.repostUsername,
      reposts: obj.reposts,
      comments: obj.comments,
      likes,
      isLiked,
      userReposted,
      metaTitle: meta.title,
      metaImage: meta.image,
      metaDescription: meta.description,
    };
  } catch {
    return {
      id: obj.id,
      url: obj.url,
      description: obj.description,
      postOwner: obj.postOwner,
      picture: obj.picture,
      username: obj.username,
      isRepost: obj.isRepost,
      repostOwner: obj.repostOwner,
      repostUsername: obj.repostUsername,
      reposts: obj.reposts,
      comments: obj.comments,
      likes,
      isLiked,
      userReposted,
      metaTitle: "Metadata not available",
      metaImage: "Metadata not available",
      metaDescription: "Metadata not available",
    };
  }
}

export async function getPosts(req, res) {
  const userId = res.locals.userId;
  const { offset } = req.query;

  if (offset) {
    try {
      const posts = await readOffsetPosts(userId, offset);
      const response = await Promise.all(
        posts.map((post) => mapMetadata(post, userId))
      );
      res.send(response);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    try {
      const { rowCount: follows } = await findFollow({
        followerId: userId,
      });
      if (follows === 0) {
        res.send("This user follows no one");
      } else {
        const posts = await readPosts(userId);
        const response = await Promise.all(
          posts.map((post) => mapMetadata(post, userId))
        );
        res.send(response);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

export async function getPostComments(req, res) {
  const { id: postId } = req.params;
  const { userId } = res.locals;

  console.log("oi");

  try {
    const { rowCount } = await findPost(postId);

    console.log("oi");

    if (rowCount === 0) {
      return res.status(404).send("Post does not exist");
    }

    console.log("oi");

    const { rows: comments } = await getComments(userId, postId);

    console.log("oi");
    res.status(200).send(comments);
  } catch {}
}

export async function createNewComment(req, res) {
  const { id: postId } = req.params;
  const {
    userId,
    sanitezedBody: { text },
  } = res.locals;

  try {
    const { rowCount } = await findPost(postId);

    if (rowCount === 0) {
      return res.status(404).send("Post does not exist");
    }

    await createComment(postId, userId, text);

    res.status(201).send();
  } catch {
    res.status(500).send("Error while creating new comment");
  }
}
