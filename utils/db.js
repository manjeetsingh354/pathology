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
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pathology_NEW';

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

module.exports = connectDB;

