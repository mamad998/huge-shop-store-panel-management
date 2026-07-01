"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({children}){

    let [cart , setCart] = useState([]);

    useEffect(()=>{
        const cartLocal = JSON.parse(localStorage.getItem("cart"))
        if(cartLocal){
            setCart(cartLocal);
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("cart" , JSON.stringify(cart))
    },[cart])

    function addToCart(product){
        const add = setCart((prev)=>{
            let selectedProduct = prev.find((item)=>item._id == product._id);

            if(!selectedProduct){
                return [...prev , {...product , quantity : 1}];
            }else{
                return prev.map((item)=>
                item._id == product._id ?
                {...item , quantity : item.quantity + 1}:
                item)
            }
        })
        return add;
    }

    function removeFromCart (productId){
        const remove = setCart(prev => prev.filter((product)=> product._id != productId));
        return remove;
    }

    function updateQuantity(productId , newQuantity){
        const update = setCart((prev)=>prev.map(
            (item)=>
                item._id == productId?
                {...item , quantity : newQuantity}:
                item
        ))
        return update;
    }

    function getTotal(){

        let total = 0;
        cart.forEach(item=>
            total += item.quantity * item.price
        )
        return total;
    }
    
    function clearCart(){
        setCart([]);
    }

    return(
        <CartContext.Provider value={{cart , addToCart , removeFromCart , updateQuantity , getTotal , clearCart}}>
            {children}
        </CartContext.Provider>
    )
}