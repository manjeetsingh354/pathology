const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report_Schema = new Schema({
    userName: {
        type: String
    },  
    serviceName: {
        type: String
    },
    doctor:{
        type: String
    },
    description:{
        typr: String
    },
    payment_status:{
        type:String
    }
},
{
    collection:"report"
}
)
Report_Schema.set("timestamps", true);
module.exports = mongoose.model("report", Report_Schema);