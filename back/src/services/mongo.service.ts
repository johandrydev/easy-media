import mongoose from "mongoose";

const dbconn = () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/easy-media';
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);
};

export default dbconn;