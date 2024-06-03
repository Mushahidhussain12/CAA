import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import router from "./routes.js";
import cookieParser from "cookie-parser";

const app = express();

 const corsOptions = {
     origin: 'http://localhost:3000',
     credentials:true
 };
  app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connect = async() => {
    console.log("db connected function has been run")
    try {
            await mongoose.connect(
            "mongodb+srv://khokharmushahidhussain:UEbasYYsaOwy5oMV@cluster0.vibifuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("DB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connect();



app.listen(5000, () => {
    console.log("server has started on the port 5000");
});
app.use(cookieParser());
app.use(router);

