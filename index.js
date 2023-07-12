import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./db.js";
import userRouter from "./Routes/userRoutes.js";

dotenv.config();
connectDB()

const app = express();

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({
        message:"Api is working"
    })
})

app.use( userRouter)

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
