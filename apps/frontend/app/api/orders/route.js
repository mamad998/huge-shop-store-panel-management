import { NextResponse } from "next/server";
import { connectedToDatabase } from "../../../library/mongodb";
import Order from "../../../models/Order";

export async function POST(request) {
  try {
    await connectedToDatabase();

    const { user, cart, totalPrice } = await request.json();

    const newOrder = new Order({
      user,
      cart,
      totalPrice,
      paymentStatus: "pending",
      createAt: new Date(),
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "درخواست سفارش شما ثبت گردید." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ثبت سفارش رخ داده است. " },
      { status: 500 },
    );
  }
}
