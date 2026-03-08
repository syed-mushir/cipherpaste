import express from "express"
import { PORT } from "./config/env.js";
import apiRoutes from "./routes/api.routes.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, '..' ,'web')))
app.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname,'..','web','404.html'));
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({status: false, message: 'Something broke!'})
})


const server = app.listen(PORT, () => {
    console.log(`API listening on ${PORT}`)
})

server.on("error", (error) => {
    console.error("Server error:", error);
});

process.on('uncaughtException',(error) => {
    console.error("Uncaught Exception", error);
});

process.on('unhandledRejection',(error) => {
    console.error("Uncaught Rejection", error);
});