const mongoose = require("mongoose")


const MealSchema = mongoose.Schema({

	category :{
		type: String ,
		required : [true,"Category is required"],
		enum : ["breakfast","lunch","snack","dinner","BreakFast","Lunch"]
	},
	name : {
		type : String ,
		required : [true ,"Name of  meal is required"],
		unique : [true,"Meal is already added!"]
	},
	fooditems:[ {type : mongoose.Schema.Types.ObjectId ,ref :'FoodItems'}]

})



const Meal = mongoose.model("Meal",MealSchema)

module.exports = Meal 
