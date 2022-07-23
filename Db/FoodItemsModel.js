const mongoose =require("mongoose")

const FoodItemSchema = mongoose.Schema({
	name : {
		type: String ,
		required : [true , "Food name is required"],
		unique : [true,"Food item is already added"]
		},
	calories : {
	        type: Number ,
		required : [true , "Calorie for food is needed"]
		},
	protein : {
		type:Number ,
		default : 0 
		},
	carb : {
		type: Number ,
		default : 0
		},
	fat : {
		type: Number ,
		default : 0
	     },
	water :{
		type :Number ,
		default : 0 
	},
	unit : {
		type:String ,
		default : 'g',
		enum : ['g','kg','item','ml','liter'] 
	}
},{timestamps:true})


const FoodItems=mongoose.model('FoodItems',FoodItemSchema)

module.exports = FoodItems
