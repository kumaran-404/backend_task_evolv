const express = require("express")
const router = express.Router()
const MealsCntl = require("../Controllers/Meals")


router.post("/add",MealsCntl.Add)

router.post("/view",MealsCntl.View)

router.post("/recommend" ,MealsCntl.Recommend)

module.exports = router