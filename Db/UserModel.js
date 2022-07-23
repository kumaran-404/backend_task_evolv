const mongoose = require("mongoose")

const DaySchema = mongoose.Schema({
    "Date" : Date ,
    meals :[ {type : mongoose.Schema.Types.ObjectId ,ref :'FoodItems'}]
}
)



const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required  : [true,"Name is required"],
        unique : [true , "User name should be unique"] 
    },
    calorieNeeded :{
        type : Number ,
        required: [true ,"calorie is required "]
    } ,
    mealPlan : {
        type : [DaySchema]
    }
})


const User = mongoose.model("User",UserSchema)

module.exports = User 
