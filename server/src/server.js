import "dotenv/config";
import connectDB from "./config/db.js";
import { app } from "./app.js";
import env from "./config/env.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(env.PORT, "0.0.0.0/0", () => {
      console.log(`Server is ruunig at port ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("DataBase connection failed!", error);
    process.exit(1);
  });
