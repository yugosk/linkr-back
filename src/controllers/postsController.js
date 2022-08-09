import { createPost } from "../repositories/postsRepository.js";

export async function newPost(req, res) {
  const { url, description } = req.body;
  const postData = {
    url,
    description,
    userId,
  };
  try {
    await createPost(postData);
    res.status(201).send("Post created successfully");
  } catch {
    res.sendStatus(500);
  }
}
