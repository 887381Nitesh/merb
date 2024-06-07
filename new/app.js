let express = require('express');
let app = express();
let port = process.env.PORT||7277;
let Mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect,getData,postData,updateOrder,deleteOrder} =require('./controller/dbController')

//middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.get('/',(req,res) => {
    res.send('Hiii From express from nodejs')
})

//get all location
app.get('/location',async(req,res)=>{
    let query ={};
    let collection = "location"
    let output = await getData(collection,query)
    res.send(output)
    
})

//get all item product
app.get('/itemlisting1',async(req,res)=>{
    let query ={}
    if(req.query.categoryId && req.query.productId ){
        query={category_id:Number(req.query.categoryId),"productType.productType_id": Number(req.query.productId)}
    }
     else if(req.query.categoryId ){
        query={category_id:Number(req.query.categoryId)}
    }
    else if(req.query.productId){
        query={"productType.productType_id": Number(req.query.productId)}
    }
    else{
        query ={}
    }
    let collection = "itemlisting1";
    let output = await getData(collection,query);
    res.send(output)
    
})

// Search of a product
app.get('/filter/:productId',async(req,res) =>{
    let productId = Number(req.params.productId);
    let cuisineId = Number(req.query.cuisineId)
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    if(cuisineId){
        query ={
            "productType.productType_id":productId,
            "cuisines.cuisine_id":cuisineId
        }
    }else if(lcost && hcost){
        query = {
            "productType.productType_id":productId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else{
        query = {}
    }
    let collection = "itemlisting1";
    let output = await getData(collection,query);
    res.send(output)
})


//product item
app.get('/item/:id',async(req,res) => {
    let id = Number(req.params.id);
    let query = {category_id:id};
    let collection = "itemlisting1";
    let output = await getData(collection,query);
    res.send(output)
})

//orders
app.get('/orders',async(req,res) => {
    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }else{
        query = {}
    }
   
    let collection = "orders";
    let output = await getData(collection,query);
    res.send(output)
})
//place order
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = "orders";
    console.log(">>>",data)
    let response = await postData(collection,data)
    res.send(response)
})

//product details {"id":[4,8,21]}
app.post('/productDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {productType_id:{$in:req.body.id}};
        let collection = 'producttype1';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})
//update
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})


app.listen(port,(err) => {
    dbConnect()
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})