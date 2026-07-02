"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

 export default function NewProduct(){

    const [formData , setFormData] = useState({
        title:"",
        price:"",
        image:"",
        description:"",
        category:"لپتاپ"
    })

    const router = useRouter();
    
    function handleChange(e){
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    async function handleSubmit(e){

        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://adminpanelhshs-git-master-mohammadreza-138171-projects.vercel.app"}/api/products` , {
            method : "POST",
            headers:{"Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        })

        if(response.ok){
            router.push("/products");
        }else{
            return <div>ارسال دیتا با شکست مواجه شد !!!</div>
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="title" placeholder="title"/>
                <input onChange={handleChange} type="number" name="price" placeholder="price" min={1 || 1}/>
                <input onChange={handleChange} type="text" name="image" placeholder="image Url"/>
                <textarea onChange={handleChange} name="description" placeholder="description" rows={5} cols={2}></textarea>
                <select onChange={handleChange} name="category">
                    <option value="موس">موس</option>
                    <option value="ساغت">ساعت</option>
                    <option value="لپتاپ">لپتاپ</option>
                    <option value="هدفون">هدفون</option>
                    <option value="چراغ مطالعه">چراغ مطالهه</option>
                    <option value="پاوربانک">پاوربانک</option>
                    <option value="بلندگو">بلندگو</option>
                    <option value="مانیتور">مانیتور</option>
                </select>
                <button type="submit">Save product</button>
            </form>
        </div>
    )
 }
