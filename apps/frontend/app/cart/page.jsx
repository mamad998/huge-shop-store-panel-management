"use client";

import Image from "next/image"
import { enTofa } from "../../utils/Utilities"
import { useContext, useState } from "react"
import { CartContext } from "../../Contexts/CartContext"
import TrashIcon from "../../components/Icons/Trash";

export default function Cart(){

    let {cart , removeFromCart , updateQuantity , getTotal , clearCart} = useContext(CartContext);

    const[userInfo , setUserInfo] = useState({
        name:"",
        email:"",
        city:"",
        country:"",
        address:"",
        postalCode:"",
        phoneNumber:""
    })
    
    function handleUserInfoChange(e){
        setUserInfo({...userInfo , [e.target.name] : e.target.value})
    }
    
    async function handleSubmit(e){
        e.preventDefault();

        const orderData = {
            user : userInfo ,
            cart,
            totalPrice : getTotal(),
        }
        try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders` , {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(orderData)
        });
        if(response.ok){
            alert("سفارش شما با موفقیت ثبت شد.");
            clearCart();
        setUserInfo({
            name:"",
            email:"",
            city:"",
            country:"",
            address:"",
            postalCode:"",
            phoneNumber:""}
            );
        }else{
            alert("خطا در صبت سفارش رخ داده است.");
        }
        }catch(error){
            alert("مشکل از سمت سرور پیش آمده است.");
        }
    }
    return(
        <div className="cart-grid">
            <div className="cart-box-products">
                <h2>سبد خرید</h2>
                {cart.length == 0 && <div>سبد خرید خالی است.</div>}
                {
                    cart.length > 0 &&(
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>کالا</th>
                                    <th>قیمت (تومان)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map(
                                        (product)=>(
                                            <tr key={product._id}>
                                                <td className="cart-product">

                                                    <Image src={product.image} width={80} height={80}
                                                    className="cart-product-image"
                                                    alt={product.title}/>

                                                    {product.title}


                                                    <input type="number" value={product.quantity || 0} min={1}
                                                    onChange={(e)=>{
                                                        const values = Number(e.target.value);
                                                            if(values >= 1){
                                                                return updateQuantity(product._id , values)
                                                        }
                                                    }}
                                                    className="w-16 border rounded px-1 text-center"
                                                    />


                                                    <button onClick={()=>removeFromCart(product._id)}><TrashIcon/></button>
                                                </td>
                                                <td>
                                                    {enTofa(product.price)}
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                                <tr>
                                    <td><strong>مجموع</strong></td>
                                    <td><strong>{enTofa(getTotal())}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
            </div>
            {
                cart.length > 0 && (
                    <div className="cart-box">
                        <h2 className="cart-title">اطلاعات شما</h2>
                        <form className="cart-form-buy" onSubmit={handleSubmit}>
                            <input onChange={handleUserInfoChange} value={userInfo.name || ""} name="name" type="text" className="cart-input-buy full-width" placeholder="نام"/>
                            <input onChange={handleUserInfoChange} value={userInfo.email || ""} name="email" type="email" className="cart-input-buy full-width" placeholder="ایمیل"/>
                            <input onChange={handleUserInfoChange} value={userInfo.city || ""} name="city" type="text" className="cart-input-buy" placeholder="شهر"/>
                            <input onChange={handleUserInfoChange} value={userInfo.country || ""} name="country" type="text" className="cart-input-buy" placeholder="کشور"/>
                            <input onChange={handleUserInfoChange} value={userInfo.address || ""} name="address" type="text" className="cart-input-buy full-width" placeholder="آدرس"/>
                            <input onChange={handleUserInfoChange} value={userInfo.postalCode || ""} name="postalCode" type="text" className="cart-input-buy" placeholder="کدپستی"/>
                            <input onChange={handleUserInfoChange} value={userInfo.phoneNumber || ""} name="phoneNumber" type="text" className="cart-input-buy" placeholder="شماره تلفن"/>
                        <button type="submit" className="cart-button-buy">پرداخت آنلاین</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
