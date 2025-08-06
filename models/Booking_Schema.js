const mongoose = require('mongoose');   
const Schema = mongoose.Schema;

const Booking_Schema = new Schema({
    userid:{
        type: String
    },
    serviceid: {
        type: String
    },
    patients:{
        type: String
    },
    symptoms: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    payment:{
        type: String
    },
    status: {
        type: String
    }
},
{
    collection:'book_ing'
}
)

Booking_Schema.set("timestamps", true)
module.exports = mongoose.model("book", Booking_Schema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const User_Schema =
//     new Schema(
//         {
//             name: {
//                 type: String,
//                 required: true
//             },
//             email: {
//                 type: String,
//                 required: true
//             },
//             phone: {
//                 type: String,
//                 required: true
//             },
//             password: {
//                 type: String
//             },
//             gender: {   
//                 type: String,
//                 required: true
//             },
//             address: {   
//                 type: String
//             }
//         },
//         {
//             collection: 'user'
//         })
// User_Schema.set('timestamps', true);
// module.exports = mongoose.model('user', User_Schema);