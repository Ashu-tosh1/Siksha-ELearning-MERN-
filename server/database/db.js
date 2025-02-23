import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const connectDb= async () =>{
    try {
        const mongoURI=process.env.MONGO_URI
        await mongoose.connect(mongoURI)
        console.log('mongodb connected')

    
      

    } catch (error) {
        console.log('error occured',error)
    }
        
}

export default connectDb