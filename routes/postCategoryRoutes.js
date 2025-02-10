

import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createPostCategoryController,
  updatePostCategoryController,
  getAllPostCategoriesController,
  getSinglePostCategoryController,
  deletePostCategoryController,
} from "../controllers/postCategoryController.js";

const router = express.Router();

// Routes
// Create post category
router.post(
  "/create-post-category", // Kjo është rruga e saktë
  requireSignIn,
  isAdmin,
  createPostCategoryController
);

// Update post category
router.put(
  "/update-post-category/:id",
  requireSignIn,
  isAdmin,
  updatePostCategoryController
);

// Get all post categories
router.get("/get-post-categories", getAllPostCategoriesController); // Përdor /get-post-categories në vend të /get-category



// Get single post category
router.get("/single-post-category/:slug", getSinglePostCategoryController);

// Delete post category
router.delete(
  "/delete-post-category/:id",
  requireSignIn,
  isAdmin,
  deletePostCategoryController
);

export default router;
