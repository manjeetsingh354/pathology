// const mongoose = require('mongoose');
// const connectDB = async()=>{
//     try{
//         const conn = await mongoose.connect("mongodb://localhost:27017/pathology_NEW");
//         console.log("database connected ");
//     }
//     catch (error) {
//         console.log(error);
//         process.exit(1);
//       }
// }
// module.exports = connectDB;




// const mongoose = require('mongoose');

// const connectDB = async() => {
//     try {
//         const conn = await mongoose.connect('mongodb://localhost:27017/pathology_NEW');
//         console.log('Database connected');
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }
// module.exports=connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://manjeetsingh802152:5dNYYiDQGkmqkU0x@cluster0.xrvr9iz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};



//<manjeet>:<password>@cluster0.mongodb.net/pathology_NEW?retryWrites=true&w=majority

module.exports = connectDB;

