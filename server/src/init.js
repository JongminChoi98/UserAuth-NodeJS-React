import "dotenv/config";
import * as http from "http";
import { initServer } from "./server";
import { AppDataSource } from "../db/dataSource";

const app = initServer();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  server.listen(PORT, () => {
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
  });
};

startServer();
