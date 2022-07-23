const express = require("express")
const { findOneAndUpdate } = require("../Db/FoodItemsModel")
const FoodItems = require("../Db/FoodItemsModel")

const Meal = require("../Db/MealsModel")
const User = require("../Db/UserModel")
const router = express.Router()

// @desc : /api/user/create
// accepts user name and calorie and creates user  
router.post("/create",async(req,res)=>{
    const data = req.body 
    const name = data.name 
    const calorieNeeded = data.calorieNeeded
    try {
        const user = User({name,calorieNeeded})
        await user.save()
        res.status(200).json({message:"success"})
    }
    catch(err){
        if(err.code===11000) res.status(401).json({message:"failure",error:"Account already exists"})
        else {
            const error = err.message 
            res.status(400).json({message:"failure",error})
        }
    }
})

// @desc : /api/user/datePlan
// used to create a date for user along with items 
// accepts 
/*
 {
     name : "xyz",
     Date : "2022-07-21"
     meal : ["idly" ,"ghee rice"]
 }

*/

router.post("/datePlan",async(req,res)=>{
    const data = req.body 
    const name = data.name 
    const date = new Date(data.date)
    console.log(data.meals)

    // there is no need for this query in real time as we usually supply id's directly from frontend 
    var items = await Meal.find({'name' : data.meals},"_id")
  

    // this query adds a new date with items specified and ensures duplicate date is not added !!
    User.findOneAndUpdate({name , 'mealPlan.Date' :{
       '$ne' : date   // does not allow duplicates 
    }} ,{
        $addToSet : {
            mealPlan : { 'Date' : date , meals : items}
        }
    }, (err,result)=>{
        if(err){
            res.json({message:"failure" , error : "some internal error"})
        }
        else return res.json({message:"success"  })
    })
    
})



//@desc : /api/user/all/<id>
// returns all datas about user , it can be made as private by adding jwt authentication 


router.get("/all/:id",async (req,res)=>{
    const name = req.params.id 
    const a  = await User.findOne({name}).populate({path:'mealPlan.meals' ,model:'Meal'})
    res.json(a)
})



// @desc : /api/user/add/<id> 

router.patch("/add/:id",async(req,res)=>{
    const name = req.params.id 
    const date = new Date(req.body.Date)
    const add = req.body.meals 
   
    // here too  , there is no need for query as id would be supplied directly in frontend 
   
    const addItems = await Meal.find({name:add})

    await User.findOneAndUpdate({name ,'mealPlan.Date':date},{
        $addToSet : {
            'mealPlan.$.meals' : addItems  
        }
    },{new:true},async(err,docs)=>{
        if(!err){
            console.log(docs)
            const data =  await docs.populate({path:'mealPlan.meals',model:'Meal'}) 
            res.json({message:"success",data})
        }
        else {
            const error = err.message 
            res.json({message:"failure" ,error})
        }
    })

   
})



router.patch("/remove/:id",async(req,res)=>{
    const name = req.params.id 
    const date = new Date(req.body.Date)
    const add = req.body.meals 
   
    // here too  , there is no need for query as id would be supplied directly in frontend 
   
    const removeItems = await Meal.find({name:add})

    await User.findOneAndUpdate({name ,'mealPlan.Date':date},{
        $pull : {
            'mealPlan.$.meals' : {
                $in : removeItems 
            }
        }
    },{new:true},async(err,docs)=>{
        if(!err){
            console.log(docs)
            const data =  await docs.populate({path:'mealPlan.meals',model:'Meal'}) 
            res.json({message:"success",data})
        }
        else {
            const error = err.message 
            res.json({message:"failure" ,error})
        }
    })

   
})

module.exports = router 