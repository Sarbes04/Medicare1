import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctors.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/bookings.js";
import path from "path";

dotenv.config();
//helps to load env variables

const app = express();
const port = process.env.PORT;

const _dirname = path.resolve();

//restricts the allowed origin more strictly
const corsOptions = {
    //allows the end domain to access the server's resources
    origin:"https://medicare1-qhli.onrender.com",
    credentials:true
}

/* app.get('/',(req,res)=>{
    res.send('API is working');
}) */

//database connection
mongoose.set('strictQuery',false)
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            /* useNewUrlParser:true,
            useUnifiedTopology: true, */
        })
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);

app.use(express.static(path.join(_dirname, "/frontend/vite-project/dist")));
//upar wali urls ke alawa koi bhi url aaye to usko serve karega idhar se
app.get('*', (_,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "vite-project", "dist", "index.html"));
});
 
app.listen(port, ()=>{
    console.log("server is running on PORT: ",port);
    connectDB();
})
