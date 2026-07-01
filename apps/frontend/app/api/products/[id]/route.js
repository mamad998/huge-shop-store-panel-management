import { NextResponse } from "next/server";
import { connectedToDatabase } from "../../../../library/mongodb";
import Product from "../../../../models/Product";

export async function GET(request, { params }) {
  try {
    await connectedToDatabase();
    const { id } = await params;
    const product = await Product.findOne({ _id: id });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت جزُییات محصول از دیتابیس" },
      { status: 500 },
    );
  }
}
