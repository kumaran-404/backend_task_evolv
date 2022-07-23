const FoodItem = require("../Db/FoodItemsModel.js")
const express = require("express")
const router = express.Router 



// api/item/add 

/*  input : 
	{
		"items" : [

			{ "name" : "Bannana" , "calories": 80 ,"protein":1},..
			] 
	}

*/

async function AddItem(req,res){
    try {
		const data = req.body 
	    try {
		
			await FoodItem.insertMany(data.items)
			res.status(200).json({message:"success"})
		}
		catch(err){
			if(err.code===11000) res.status(400).json({message:"failure",error:"Item already found"})
			else {
				let error = err.message
				res.status(400).json({message:"failure",error})
			}
		}
	}
    catch(err){
		console.log(err.message)
		res.status(501).json({message:"failure",error:"Internal server error"})
    }

}

module.exports ={ AddItem }
