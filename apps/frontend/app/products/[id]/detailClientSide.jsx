"use client";

import Link from "next/link";
import { enTofa } from "../../../utils/Utilities";
import { useContext } from "react";
import { CartContext } from "../../../Contexts/CartContext";

export default function DetailClientSide({mainProduct}){
let {addToCart} = useContext(CartContext);

    return(
        <div className="product-detail-content">
            <div className="new-product-image">
                <img src={mainProduct.image} alt={mainProduct.title}/>
            </div>

            <div className="new-product-info">
                <h1 className="new-product-title">{mainProduct.title}</h1>
                <span className="hover:text-sky-300 cursor-pointer duration-150 block h-12">دسته بندی : <Link href={`/products?category=${mainProduct.category}`}>{mainProduct.category}</Link></span>
                
                <p className="new-product-description">{mainProduct.description}</p>
                <div className="product-price-row">
                    <div className="product-price">{enTofa(mainProduct.price)}تومان</div>
                    <button className="product-button" onClick={()=>addToCart(mainProduct)}>
                        افزودن به سبد خرید
                    </button>
                </div>
            </div>
        </div>
    )
}