import mongoose from 'mongoose'
const DBConnection = async() =>{

     const DB_URL= `mongodb+srv://kabita1822000:1dUmhx4EjfTI0TyY@filesharing.ba5uaot.mongodb.net/?retryWrites=true&w=majority`
    try{
       await mongoose.connect(DB_URL, {useNewUrlParser: true});
        console.log("Database connected successfully");
    }
    catch(error){
        console.error('Error while connectiong while database', error.message);
    }
}

export default DBConnection;