import express from "express";
import {
  createTeamController,
  updateTeamController,
  getAllTeamsController,
  deleteTeamController,
} from "../controllers/TeamController.js";

const router = express.Router();

// Create team
router.post("/create-team", createTeamController);

// Update team
router.put("/update-team/:id", updateTeamController);

// Get all teams
router.get("/get-teams", getAllTeamsController);

// Delete team
router.delete("/delete-team/:id", deleteTeamController);

export default router;




