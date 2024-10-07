import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async() =>{
    if(isConnected){
        console.log("Already connected to DB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string,{
            dbName: "techquest",
        });
        isConnected = true;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting to DB",error);
    }
}