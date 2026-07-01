import { NextResponse } from "next/server";
import { connectedToDatabase } from "../../../../library/mongodb";
import Product from "../../../../models/Product";

export async function GET(request, { params }) {
  try {
    await connectedToDatabase();

    const { id } = await params;
    const product = await Product.findById(id);

    return NextResponse.json(
      { product, message: "دیتا محصول دریافت شد" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت دیتا از دیتابیس" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectedToDatabase();

    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "محصول مورد نظر یافت نشد !" },
        { status: 404 },
      );
    }

    await product.deleteOne();

    return NextResponse.json(
      { message: "محصول با موفقیت حذف شد" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "محصول شما از دیتابیس دریافت نشد" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectedToDatabase();

    const { id } = await params;
    const data = await request.json();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "ایدی محصول یافت نشد" },
        { status: 404 },
      );
    }
    Object.assign(product, data);
    await product.save();

    return NextResponse.json(
      { message: "محصول با موفقیت بروزرسانی شد" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "دستیابی به دیتابیس ناموفق بود" },
      { status: 500 },
    );
  }
}
