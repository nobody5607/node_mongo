import mongoose from "mongoose";
export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CONNECT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`+++เชื่อต่อ Mongodb สำเร็จ+++`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
