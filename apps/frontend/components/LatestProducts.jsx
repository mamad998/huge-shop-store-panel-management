export const dynamic = 'force-dynamic';
import Link from "next/link";
import ProductList from "./ProductList"


export default async function LatestProducts({searchParams}){
    
    const params = await searchParams;

    let ppg = 6;
    let page = parseInt(params?.page) || 1;
    if(page < 1)page = 1;

    const category = params?.category;

    const url = category ?
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`:
    "${process.env.NEXT_PUBLIC_API_URL}/api/products"

    const response = await fetch(url , {cache: "no-store"});
    const products = await response.json();

    const allPages = Math.ceil(products.length/ppg);

    let firstIndex = (page - 1) * ppg;
    let lastIndex = firstIndex + ppg;

    let showProducts = products.slice(firstIndex , lastIndex);

    const categoryQuery = category ? `&category=${category}` : "";

    return(
        <div className="new-products">
            <h2 className="title">{category ? `محصولات ${category}` : "محصولات پر فروش"}</h2>
            <ProductList showProducts={showProducts}/>
            <div className="flex items-center justify-center text-center gap-4 flex-row-reverse pagination " dir="ltr">
                {
                    page > 1 && (<Link className="bg-blue-500 hover:bg-blue-600 duration-150 rounded-md " 
                    href={`?page=${page - 1}${categoryQuery}`}>Previous</Link>
                )}

                <div className="black font-extrabold flex justify-center items-center flex-row-reverse" dir="ltr">
                     <span className="text-sky-500"> {page} </span>
                      <pre> of </pre>
                      <span> {allPages} </span>
                      </div>
                {
                    page < allPages && (<Link className="bg-blue-500 hover:bg-blue-600 duration-150 rounded-md "
                     href={`?page=${page + 1}${categoryQuery}`}>Next</Link>
                )}
            </div>
        </div>
    )
}









