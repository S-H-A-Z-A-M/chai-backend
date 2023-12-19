// require('dotenv').config({path: './env'});

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();

// import express from "express";

// const app = express();
// (async () => {
//   try {
//     const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.error("ERRRR", err);
//       throw err;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log("listening on port " + process.env.PORT);
//     });
//   } catch (error) {
//     console.error("ERROR: " + error);
//     throw error;
//   }
// })();
