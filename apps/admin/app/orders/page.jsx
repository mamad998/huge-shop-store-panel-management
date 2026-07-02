export const dynamic = 'force-dynamic';
import { enTofa, enTofaNum } from "../../utils/Utilities";

export default async function Order(){
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://adminpanelhshs-git-master-mohammadreza-138171-projects.vercel.app" }/api/orders`);
    const orders = await response.json();

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country - city - postalCode</th>
                    <th>Address</th>
                    <th>Phone number</th>
                    <th>TP</th>
                    <th>PAID</th>
                    <th>Date</th>
                    <th>Products</th>
                </tr>
            </thead>

            <tbody>
                {
                    orders.map((order)=>(
                        <tr key={order._id}>
                    <td>{order.user.name}</td>
                    <td>{order.user.email}</td>
                    <td>{order.user.country} - {order.user.city} - {order.user.postalCode}</td>
                    <td>{order.user.address}</td>
                    <td>{enTofaNum(order.user.phoneNumber)}</td>
                    <td>{enTofa(order.totalPrice)}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{new Date(order.createAt).toLocaleDateString("fa-IR")}</td>
                    <td>{order.cart.map((item , index)=>(
                        <div key={index} className="mb-1">
                            <strong>{item.title}</strong> 
                            <span className="text-gray-500"> (تعداد: {item.quantity})</span>
                        </div>
                    ))}</td>
                </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
