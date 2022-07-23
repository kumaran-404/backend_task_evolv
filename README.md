# backend_task_evolv

## End points :

## Fooditem :
 1.post: /api/item/add
    - Input : {  "item" : [
           {
              "name" : "eggs" ,
              "calories" : 70 ,
               "protein": 6 ,
               "unit" : "g"
           }
    ] } 
    - Output on successfull insertion : {message : "success"}
    - Output on failure : {message:"failure" , error:"xyz"}
    
##  Meals :
   1.post : /api/meal/add 
     - Input : {   name : "Pre workout " , category:"lunch" , fooditems:["eggs","pork"]  }   
     - Output on successfull insertion : {message : "success"}
     - Output on failure : {message:"failure" , error:"xyz"}
     
  2. get : /api/meal/view   
     - output : all meals that are in db
    
  3. post /api/meal/recommend 
      - Input : { calorie : x, length: x}  // length is optional
      - Output : { reference ,results } 
      
 ## User :
   1. post /api/user/create
   `  - Input : { name : "xyz" , calorieNeeded : 2000}
   2. post /api/user/datePlan 
      - Input : { name:"xyz",Date : "2022-07-23" , "meal":["pre-workout"] }
   3. get /api/all/<username>
      - Output : whole user data 
   4. patch /api/user/add/<username> 
      - Input : { "Date":"xyz" , "meals": ["pre-workout"]}
   5. patch /api/user/remove/<username>
      - Input :{"Date":"xyz","meals":["pre-workout"]}
   
   
   
   
   
   
