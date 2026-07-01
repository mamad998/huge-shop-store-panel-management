import { NextResponse } from "next/server";
import { connectedToDatabase } from "../../../library/mongodb";
import Product from "../../../models/Product";

export async function GET(request) {
  try {
    await connectedToDatabase();
    const { searchParams } = new URL(request.url);
    const category = await searchParams.get("category");
    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find({});
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت محصولات از دیتابیس" },
      { status: 500 },
    );
  }
}
