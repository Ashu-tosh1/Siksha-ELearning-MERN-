import express from "express"
import dotenv from 'dotenv'
import connectDb from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js"

dotenv.config();
connectDb();
const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials:true,
  })
);



//apis
app.use('/api/v1/user', userRoute)
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media",mediaRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})