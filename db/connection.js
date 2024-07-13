// import modules:
import mongoose from "mongoose";
// create db connection:
export const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/jobSearchApp").then(() => {
      console.log("database connected successfully.");
    }).catch((err) => {
      console.log("failed to connect to database.");
    });
};