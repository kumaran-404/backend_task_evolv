const mongoose = require("mongoose")
const Meal = require("../Db/MealsModel")
const FoodItem = require("../Db/FoodItemsModel")

// api/meal/add 

/*

{  name : "Pre workout " , category:"lunch" , fooditems:["eggs","pork"]}
// note : food items should be in db at first
*/
async function Add(req,res){
        const data = req.body 
        const items = data.fooditems
		const name = data.name 
		const category = data.category
		const fooditems  = await FoodItem.find({'name':items},"_id")
		if(fooditems.length===items.length){
				console.log(fooditems)
				const meal = Meal({name,category,fooditems})
				try{
					
					await meal.save() 
					res.json({message:"success"})
				}
				catch(err){
					if(err.code===11000) res.status(400).json({message:"failure",error:"Meal already found"})
					else {
						let error = err.message 
						res.status(400).json({message:"failure",error})
					}
				}
				
		}
		else res.status(400).json({message:"failure",error:"Some items are not in db"})
}


// api/meal/view
async function View(req,res){
    const name = req.body.name 
    const data = await Meal.find({name}).populate("fooditems","-_id -__v")
    res.json(data)

}


/// -------------------------------------------------------------------------------------------------------------------------- ///

let a  = 0;
const   FindAll = (start,totalCalorie,totalProtein,nums,reference,maxLength,item,count,ans)=>{
	
	if((ans.answer.length>=maxLength)) return ;

	// case to handle when calorie extends max calorie 
	if((totalCalorie> reference.maxCalorie) ) return ;

	const countLength = Object.keys(count).length
 
	 // checks for atleast 2 distinct item and at max 5 distinct items in list 
	if( (totalCalorie>=reference.minCalorie)&& (countLength >=2) &&   (countLength <=5)){
		
		if((totalCalorie<=reference.maxCalorie) && (totalProtein>=reference.minProtein) && (totalProtein<=reference.maxProtein))
		{a++; const protein = ((totalProtein)/4)+ "g" ; ans.answer.push({items:{...count},calorie : totalCalorie ,protein: protein })}
		return 
	}

	for(var i = start ;i<nums.length;i++){
		 
		let cal = totalCalorie+(nums[i].calories)
		if(count[nums[i].name]===undefined) count[nums[i].name] = 0 ;
		

  		if(count[nums[i].name]<3) {
			count[nums[i].name] ++ ;
			let pro = nums[i].protein*4
		pro = pro+totalProtein
		FindAll(i,cal,pro,nums,reference,maxLength,item,count,ans)
		
		count[nums[i].name] -- ;

		if(!count[nums[i].name]) delete count[nums[i].name]
		  }
		
		
	}
	
}


// @desc : /api/meal/recommend
// accepts : { calorie:x , length : x } length is optional here 
// returns reference , results 

async function Recommend(req,res){
	const calorie = req.body.calorie 
	const maxLength = req.body.length || 1000
	const minProtein = 0.2* calorie , maxProtein = 0.3* calorie ;
	const maxCalorie = 100 + calorie , minCalorie = calorie-100;
	let item = []
	let count = {}
	let ans= {"answer":[]}

	let  reference = {minProtein,maxProtein,minCalorie,maxCalorie}



	console.log(reference)
	const items = await FoodItem.find({},"name calories protein").sort({"protein":-1})
	console.log(items.length)
	FindAll(0,0,0,items,reference,maxLength,item,count,ans) 
	reference = {
		'Calories needed' : calorie ,
		'Calorie from protein' :  {
			'max' :{ 'weight' : (maxProtein/4)+'g' ,'calorie' : maxProtein }, 'min' : { 'weigth':(minProtein/4) +'g' ,'calorie' :minProtein}
		}
	}
	let len = ans.answer.length 
	console.log(len)
	res.json({reference, 'Number of results found' :len   ,'results':ans})

}

module.exports = {
    Add , View , Recommend 
}
