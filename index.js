const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");


const jobroutes=require("./routes/job");

const app=express();

dotenv.config();

app.use(express.json());

mongoose
.connect(process.env.DB_CONNECTION_URL)
.then(()=>console.log("Connection with database esatablished succesfully"))
.catch((err)=>console.log("Error connecting database",err));

// api routes
app.use(jobroutes);

app.listen(10000,()=>console.log("Server is running on port 10000"));
