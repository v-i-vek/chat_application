import mongoose from "mongoose";


export function connectDB(){
try {
    
    mongoose.connect(process.env.MONGODB_URI,{
        dbName:'chatApp'
    }).then(()=>console.log("Database connected sucess")).catch((error)=>console.log("error while connecting to db \n",error))
} catch (error) {
    console.log("error \n",error)
}

}