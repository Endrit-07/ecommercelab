// import mongoose from "mongoose";

// const teamSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   slug: {
//     type: String,
//     lowercase: true,
//     unique: true,
//   },
// });

// export default mongoose.model("Team", teamSchema);



import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },
  playerName: {
    type: String,
    required: true, // Emri i lojtarit është i detyrueshëm
  },
});

export default mongoose.model("Team", teamSchema);



