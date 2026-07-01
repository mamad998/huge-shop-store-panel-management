"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function EditProduct(){

    const router = useRouter();
    const {id} = useParams();

    useEffect(
        ()=>{
            async function fetchProduct(){
                const response = await fetch(`http://localhost:3001/api/products/${id}`);
                const data = await response.json();
                setFormData(data.product)
            }
            fetchProduct();
        }

        ,[])

    const [formData , setFormData] = useState({
            title:"",
            price:"",
            image:"",
            description:"",
            category:"لپتاپ"
        })

        function handleChange(e){
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();

        const response = await fetch(`http://localhost:3001/api/products/${id}` ,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formData)
        })
        if(response.ok){
            router.push("/products");
        }
    }

return(
     <div>
            <form onSubmit={handleSubmit}>
                <h1 className="text-lg font-bold m-3">Edit the product below</h1>
                <input value={formData.title} onChange={handleChange} type="text" name="title" placeholder="title"/>
                <input value={formData.price} onChange={handleChange} type="number" name="price" placeholder="price" min={1}/>
                <input value={formData.image} onChange={handleChange} type="text" name="image" placeholder="image Url"/>
                <textarea value={formData.description} onChange={handleChange} name="description" placeholder="description" rows={5} cols={2}></textarea>
                <select value={formData.category} onChange={handleChange} name="category">
                    <option value="موس">موس</option>
                    <option value="ساغت">ساعت</option>
                    <option value="لپتاپ">لپتاپ</option>
                    <option value="هدفون">هدفون</option>
                    <option value="چراغ مطالعه">چراغ مطالهه</option>
                    <option value="پاوربانک">پاوربانک</option>
                    <option value="بلندگو">بلندگو</option>
                    <option value="مانیتور">مانیتور</option>
                </select>
                <button type="submit">Save new information</button>
            </form>
        </div>
)
}