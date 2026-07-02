"use client";

import { useParams, useRouter } from "next/navigation"
import { NextResponse } from "next/server";

 export default function DeleteProduct(){

    const router = useRouter();
    const {id} = useParams();

   async function handleDelete(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://adminpanelhshs-git-master-mohammadreza-138171-projects.vercel.app"}/api/products/${id}` , {
        method : "DELETE",
        headers : {"Content-Type" : "application/json"}
    })
    if(response.ok){
        router.push("/products")
        return NextResponse.json({message : "محصول با موفقیت حذف شد"} , {status : 200})
    }
    }
    return(
        <div>
            <h1 className="m-5 font-bold text-2xl">Are you sure you want to <strong><u>delete</u></strong> this product ?</h1>
            <div className="flex gap-3 m-5">
                <button  onClick={handleDelete}>Yes , delete</button>
            <button onClick={()=>router.push("/products")}>Cancel</button>
            </div>
        </div>
    )
 }
