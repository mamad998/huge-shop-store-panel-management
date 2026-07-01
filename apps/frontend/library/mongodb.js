import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (uri === "production" && !uri) {
  throw new Error("تنظیمات دیتا بیس را وارد کنید.");
}

let isConnected = false;

export async function connectedToDatabase() {
  if (isConnected) return console.log("قبلا متصل شده اید");

  try {
    await mongoose.connect(uri, { dbName: "shopStoreDB" });
    isConnected = true;
    console.log("اتصال به دیتابیس موفقیت آمیز بود.");
  } catch (err) {
    console.error("خطای اتصال به دیتا بیس", err);
  }
}
