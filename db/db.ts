import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
  } catch (error) {
    console.error(error)
  }


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch(err => console.log(err));