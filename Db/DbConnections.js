const mongoose = require("mongoose")
require("dotenv").config({path:"../.env"})

const MONGO_URL = "mongodb+srv://kumaran:mnbv0987@cluster0.9jfpo.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL)

const db = mongoose.connection

db.on("error",()=>{console.log("Error connecting to DB")})

db.once("open",()=>{
	console.log("Connected To DataBase")
});
