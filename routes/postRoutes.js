import express from "express";
import {
  createPostController,
  updatePostController,
  getPostController,
  getSinglePostController,
  deletePostController,
  postPhotoController,
  
  
} from "../controllers/postController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// Krijimi i një postimi
router.post(
  "/create-post",
  requireSignIn,
  isAdmin,
  formidable(),
  createPostController
);

// Përditësimi i një postimi
router.put(
  "/update-post/:postId",
  requireSignIn,
  isAdmin,
  formidable(),
  updatePostController
);

// Të gjitha postimet
router.get("/get-posts", getPostController);

// Një postim i vetëm
router.get("/get-post/:slug", getSinglePostController);

// Fshirja e një postimi
router.delete("/delete-post/:postId", requireSignIn, isAdmin, deletePostController);

// Foto e postimit
router.get("/post-photo/:postId", postPhotoController);



export default router;

