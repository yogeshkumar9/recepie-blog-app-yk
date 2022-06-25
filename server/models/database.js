const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI,{
//      useNewUrlParser:true,useUnifiedTopology:true,
// });
const db='mongodb+srv://yogeshkumar99:sahilkumar9873@cluster0.i4f7j.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(db).then(()=>{
     console.log('connection successful');
}).catch((error)=>{
     console.log(`connection FUCK`);
})
require('./Category');
require('./recepie');
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',function(){
//      console.log('Connected')
// });
