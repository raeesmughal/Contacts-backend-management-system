const mongoose = require('mongoose');


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.CONNECTION_STRING_LOCAL);
        console.log('mongodb connected : ',
            conn.connection.host,
            conn.connection.name
        );
    }catch(er){
        console.log(er);
        process.exit(1);
    }
}


module.exports = connectDB;