import { NextResponse } from "next/server";
import { connectedToDatabase } from "../../../library/mongodb";
import Product from "../../../models/Product";

export async function GET() {
  try {
    await connectedToDatabase();

    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "عدم دریافت پاسخ از دیتابیس" },
      { status: 500 },
    );
  }
}
export async function POST(request) {
  try {
    await connectedToDatabase();

    const data = await request.json();
    const newProduct = new Product(data);
    await newProduct.save();

    return NextResponse.json(
      { message: "محصول مورد نظر شما با موفقیت به دیتابیس اضافه شد." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: " عملبات ارسال دیتا دچار مشکل شده است" },
      { status: 500 },
    );
  }
}
