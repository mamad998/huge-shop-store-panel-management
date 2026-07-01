import { NextResponse } from "next/server";
import { connectedToDatabase } from "../../../library/mongodb";
import Order from "../../../models/Order";

export async function GET() {
  try {
    await connectedToDatabase();

    const orders = await Order.find({});
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت سفارش کاربران" },
      { status: 500 },
    );
  }
}
