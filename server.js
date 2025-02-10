
// import express from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cors from "cors";
// import teamRoutes from "./routes/TeamRoutes.js";
// import postRoutes from "./routes/postRoutes.js"; // Shtohet për postimet
// import postCategoryRoutes from "./routes/postCategoryRoutes.js"; // Shtohet për kategoritë e postimeve


// // Configure env
// dotenv.config();

// // Database config
// connectDB();

// // Rest object
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);

// // Rrugët për blogun
// app.use("/api/v1/post", postRoutes); // Rrugë për postimet
// app.use("/api/v1/post-category", postCategoryRoutes); // Rrugë për kategoritë e postimeve





// // Rrugët për Teams
// app.use("/api/teams", teamRoutes);

// // Rest API
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });

// // Port
// const PORT = process.env.PORT || 5000;

// // Run listen
// app.listen(PORT, () => {
//   console.log(
//     `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
//       .white
//   );
// });
  
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import teamRoutes from "./routes/TeamRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // Rrugë për postimet
import postCategoryRoutes from "./routes/postCategoryRoutes.js"; // Rrugë për kategoritë e postimeve


// Configure env
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Konfigurimi i personalizuar i morgan për të shmangur statuse 304
app.use(
  morgan((tokens, req, res) => {
    const status = tokens.status(req, res);
    if (status === "304") {
      return null; // Mos logo statuse 304
    }
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      status,
      tokens["response-time"](req, res) + " ms",
      "-",
      tokens.res(req, res, "content-length") || "-",
    ].join(" ");
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


// Rrugët për blogun
app.use("/api/v1/post", postRoutes); // Rrugë për postimet
app.use("/api/v1/post-category", postCategoryRoutes); // Rrugë për kategoritë e postimeve

// Rrugët për Teams
app.use("/api/teams", teamRoutes);

// Rest API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// Port
const PORT = process.env.PORT || 5000;

// Run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});

