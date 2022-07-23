const express = require("express")
const app = express()
require("dotenv").config()
const PORT_NO = 3000 || process.env.PORT_NO 

// connection to Mongodb
require("./Db/DbConnections.js")

// parse post data 
app.use(express.json())

// Food Item routes

app.use("/api/item",require("./routes/FoodItemRoute.js"))

// Meal routes

app.use("/api/meal",require("./routes/MealRoutes"))

// user routes 

app.use("/api/user",require("./routes/UserRoute"))


app.listen(3000,()=>{
 console.log("server started")
})
