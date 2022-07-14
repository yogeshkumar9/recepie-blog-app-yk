const mongoose = require('mongoose');
require("dotenv").config() ;

const MONGO_DB="mongodb://yogeshkumar99:sahilkumar9873@cluster0-shard-00-00.i4f7j.mongodb.net:27017,cluster0-shard-00-01.i4f7j.mongodb.net:27017,cluster0-shard-00-02.i4f7j.mongodb.net:27017/blog-app?ssl=true&replicaSet=atlas-nw7ao3-shard-0&authSource=admin&retryWrites=true&w=majority"



const connectdb = async()=>{
 mongoose.connect(MONGO_DB,
    { 
    });
    console.log('db connected..!')
}
require('./Category');
require('./recepie');
module.exports=connectdb; 

