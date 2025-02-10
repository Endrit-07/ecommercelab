import postCategoryModel from "../models/postCategoryModel.js";
import slugify from "slugify";

// Create Post Category
export const createPostCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await postCategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Post Category Already Exists",
      });
    }
    const category = await new postCategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New post category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Post Category",
    });
  }
};

// Update Post Category
export const updatePostCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await postCategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating post category",
    });
  }
};

// Get All Post Categories
export const getAllPostCategoriesController = async (req, res) => {
  try {
    const categories = await postCategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Post Categories List",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all post categories",
    });
  }
};

// Get Single Post Category
export const getSinglePostCategoryController = async (req, res) => {
  try {
    const category = await postCategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Post Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Post Category",
    });
  }
};

// Delete Post Category
export const deletePostCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await postCategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Post Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting post category",
      error,
    });
  }
};
