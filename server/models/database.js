const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI,{
//      useNewUrlParser:true,useUnifiedTopology:true,
// });
const URI="mongodb+srv://yogeshkumar99:sahilkumar9873@cluster0.i4f7j.mongodb.net/?retryWrites=true&w=majority";


// mongoose.connect(db).then(()=>{
//      console.log('connection successful');
// }).catch((error)=>{
//      console.log(`connection FUCK`);
// })
const connectdb = async()=>{
await mongoose.connect(URI,
    { useunifiedTopology:true,
     useNewUrlParser: true
    });
    console.log('db connected..!')
}
require('./Category');
require('./recepie');
module.exports=connectdb; 
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',function(){
//      console.log('Connected')
// });
