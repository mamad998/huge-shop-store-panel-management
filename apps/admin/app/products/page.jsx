export const dynamic = 'force-dynamic';
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default async function Products(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const products = await response.json();

    return(
        <div>
            <h1 className="text-3xl font-extrabold my-5"> The products page</h1>
            
            <Link href="/products/newproduct">
                <button>Add new Products</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th className="w-12 text-center">.NO</th>
                        <th>Product name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                 
                 <tbody>
                    {
                        products.map((product , index) => (
                            <tr key={product._id}>
                                <td className="p-3 font-bold">.{index + 1}</td> 
                                <td dir="rtl">{product.title}</td>
                                <td className="flex justify-start items-center">
                                    <Link href={`/products/edit/${product._id}`}><FiEdit className="size-9"/> </Link>
                                    <Link className="text-red-400 hover:text-red-500 duration-150" href={`/products/delete/${product._id}`}>
                                    <FiTrash2 className="size-9"/>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                 </tbody>
            </table>
        </div>
    )
}
