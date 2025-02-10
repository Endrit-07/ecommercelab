import postModel from "../models/postModel.js";
import fs from "fs";
import slugify from "slugify";

// Krijimi i një postimi
export const createPostController = async (req, res) => {
  try {
    const { title, content, category, author } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is required" });
      case !content:
        return res.status(500).send({ error: "Content is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
        case !author:
        return res.status(500).send({ error: "Author is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo should be less than 1MB" });
    }

    const post = new postModel({ ...req.fields, slug: slugify(title) });
    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.contentType = photo.type;
    }
    await post.save();
    res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating post",
    });
  }
};

// Të gjitha postimet
export const getPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching posts",
      error,
    });
  }
};

// Postim i vetëm
export const getSinglePostController = async (req, res) => {
  try {
    const post = await postModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching post",
      error,
    });
  }
};

// Përditësimi i një postimi
export const updatePostController = async (req, res) => {
  try {
    const { title, content, category, author } = req.fields;
    const { photo } = req.files;

    const post = await postModel.findByIdAndUpdate(
      req.params.postId,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.contentType = photo.type;
    }
    await post.save();
    res.status(201).send({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating post",
    });
  }
};

// Fshirja e një postimi
export const deletePostController = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.postId).select("-photo");
    res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting post",
      error,
    });
  }
};

// Foto e postimit
export const postPhotoController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId).select("photo");
    if (post.photo.data) {
      res.set("Content-Type", post.photo.contentType);
      return res.status(200).send(post.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching photo",
      error,
    });
  }
};
