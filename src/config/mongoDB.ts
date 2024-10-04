import mongoose from 'mongoose';

// MongoDB connection
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI ?? 'No MongoDB URI provided';

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}
