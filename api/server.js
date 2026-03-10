import express from "express"
import { PORT } from "./config/env.js";
import apiRoutes from "./routes/api.routes.js";
import { fileURLToPath } from 'url';
import path from 'path';
import { checkPaste } from "./controllers/checkPaste.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use("/api", apiRoutes);
app.use("/:id", checkPaste(path.join(__dirname, '..' ,'web','view.html')))
app.use(express.static(path.join(__dirname, '..' ,'web')))
app.use((req,res) => {
    res.sendFile(path.join(__dirname,'..','web','404.html'));
})

app.use((err, req, res, next) => {
    if(err.name == "AppError"){
        res.status(err.statusCode).json({status: false, message: err.message});
        return;
    }
    console.error(err.stack)
    res.status(500).json({status: false, message: 'Internal Server Error'})
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