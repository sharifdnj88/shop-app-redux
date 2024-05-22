import mongoose from "mongoose"

// create a mongodb connection
const mongoDBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected successful`.bgBlue.black);
    } catch (error) {
        console.log(`${error.message}`.bgRed.black);
    }
}

export default mongoDBConnect;