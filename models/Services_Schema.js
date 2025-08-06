const mongoose=require('mongoose');
const schema=mongoose.Schema;

const Service_Schema=new schema({
    name:{
        type:String
    },
    price:{
        type:String
        
    },
    details:{
        type:String
    },
    image:{
        type:String
    }
},
{
    collection:'service'
}
);
Service_Schema.set('timestamps',true);
module.exports=mongoose.model('service',Service_Schema);
