"use client"

import Link from "next/link";
import { useContext, useState } from "react";
import BarsIcon from "./Icons/BarsIcon";
import { CartContext } from "../Contexts/CartContext";

export default function Header() {

  const {cart} = useContext(CartContext);
  const [isActiveMobile , setisActiveMobile] = useState(false);
  return (
    <header className="header">

      <div className="header-wrapper">

        <Link href={"/"} className="logo">
        <img src="/images/logo.jpg" className="rounded-sm" alt="logo"/>
        </Link>
        
        <nav className={`nav ${isActiveMobile ? "active": ""}`}>
          <Link className="nav-link" href={"/"}>صفحه اصلی</Link>
          <Link className="nav-link" href={"/products"}>محصولات</Link>
          <Link className="nav-link" href={"/cart"}>سبد خرید</Link>
          {cart.length > 0 ? <span className="nav-link">( {cart.length} )</span> : ""}
        </nav>

        <button className="nav-button" onClick={()=>setisActiveMobile((prev)=>!prev)}>
          <BarsIcon/>
        </button>

      </div>
      
    </header>
  );
}



