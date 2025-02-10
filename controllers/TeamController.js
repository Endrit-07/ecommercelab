// import TeamModel from "../models/TeamModel.js";
// import slugify from "slugify";

// // Create a new team
// export const createTeamController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) {
//       return res.status(400).send({ message: "Name is required" });
//     }
//     const existingTeam = await TeamModel.findOne({ name });
//     if (existingTeam) {
//       return res.status(400).send({ message: "Team already exists" });
//     }
//     const team = await new TeamModel({
//       name,
//       slug: slugify(name),
//     }).save();
//     res.status(201).send({ success: true, team });
//   } catch (error) {
//     res.status(500).send({ success: false, error });
//   }
// };

// // Update a team
// export const updateTeamController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;
//     const team = await TeamModel.findByIdAndUpdate(
//       id,
//       { name, slug: slugify(name) },
//       { new: true }
//     );
//     res.status(200).send({ success: true, team });
//   } catch (error) {
//     res.status(500).send({ success: false, error });
//   }
// };

// // Get all teams
// export const getAllTeamsController = async (req, res) => {
//   try {
//     const teams = await TeamModel.find({});
//     res.status(200).send({ success: true, teams });
//   } catch (error) {
//     res.status(500).send({ success: false, error });
//   }
// };

// // Delete a team
// export const deleteTeamController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await TeamModel.findByIdAndDelete(id);
//     res.status(200).send({ success: true, message: "Team deleted successfully" });
//   } catch (error) {
//     res.status(500).send({ success: false, error });
//   }
// };









import TeamModel from "../models/TeamModel.js";
import slugify from "slugify";

// Krijimi i një ekipi të ri
export const createTeamController = async (req, res) => {
  try {
    const { name, playerName } = req.body; // Merrni emrin e ekipit dhe lojtarit
    if (!name || !playerName) {
      return res.status(400).send({ message: "Name and playerName are required" });
    }
    const existingTeam = await TeamModel.findOne({ name });
    if (existingTeam) {
      return res.status(400).send({ message: "Team already exists" });
    }
    const team = await new TeamModel({
      name,
      slug: slugify(name),
      playerName, // Shto emrin e lojtarit në model
    }).save();
    res.status(201).send({ success: true, team });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// Përditësimi i një ekipi
export const updateTeamController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, playerName } = req.body; // Merrni emrin e ekipit dhe lojtarit për përditësim
    const team = await TeamModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), playerName }, // Përditësoni edhe emrin e lojtarit
      { new: true }
    );
    res.status(200).send({ success: true, team });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// Get all teams
export const getAllTeamsController = async (req, res) => {
  try {
    const teams = await TeamModel.find({});
    res.status(200).send({ success: true, teams });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// Fshirja e një ekipi
export const deleteTeamController = async (req, res) => {
  try {
    const { id } = req.params;
    await TeamModel.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

