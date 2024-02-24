const express= require('express')
const cors =require('cors');
require('./db/config')
const User=require("./db/User");
const product=require("./db/Product");
const Product = require('./db/Product');
const app = express();

app.use(express.json());
app.use(cors())


app.post("/register", async(req,res)=>{
    const { name,email,password }=req.body
    // return res.json({name,email,password })
    let user= new User({name,email,password });
    let result = await user.save();
//    return res.json({message:result})
    result = result.toObject();
    delete result.password
     res.send(result)

});

app.post("/login", async(req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");
    if(user){
        res.send(user)
    }else{
        res.send({result:"No user matching "})
    }
}else{
    res.send({result:"No user matching "})
}
})

app.post("/add-product",async(req,res)=>{
    let product=new Product(req.body);
    let result = await product.save();
    res.send(result)




})
app.listen(5000)


// const connectDB= async()=>{
//         mongoose.connect('mongodb://localhost:27017/Inventory');
//         const productsSchema= new mongoose.Schema({});
//         const products= mongoose.model('product',productsSchema);
//         const data=await products.find();
//         console.warn(data);
    
//        }
//     connectDB();