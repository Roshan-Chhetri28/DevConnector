const mongoose = require("mongoose")
const config = require("config") // it is like load_env()
const db = config.get('mongoURI') // it is like os.getenv("mongoURI")

const connectDB = async () =>{
    try{
        await mongoose.connect(db) // connects to the remote hosted db through URI

        console.log("DB connected")
    }catch(err){
        console.error(err.message)
        // exit process with faliure
        process.exit(1)
    }
}

module.exports = connectDB;
