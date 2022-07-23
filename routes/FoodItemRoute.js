const express = require("express")
const router = express.Router() 
const FoodItemCntl = require("../Controllers/FoodItems.js")

router.post("/add",FoodItemCntl.AddItem)

module.exports = router 
