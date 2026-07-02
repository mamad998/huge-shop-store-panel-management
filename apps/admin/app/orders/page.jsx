export const dynamic = 'force-dynamic';
import { enTofa, enTofaNum } from "../../utils/Utilities";

export default async function Order() {
  // ۱. ساخت URL با اطمینان کامل
  let url = '/api/orders'; // پیش‌فرض: آدرس نسبی (اگر API داخل خود پروژه است)
  
  // اگر متغیر محیطی وجود دارد، از آن استفاده کن، ولی حتماً پروتکل https:// را اضافه کن
  if (process.env.NEXT_PUBLIC_API_URL) {
    let base = process.env.NEXT_PUBLIC_API_URL;
    if (!base.startsWith('http')) base = 'https://' + base;
    url = base + '/api/orders';
  }

  let orders = [];
  let error = null;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    orders = await res.json();
  } catch (err) {
    error = 'خطا در دریافت سفارشات';
    console.error(err);
  }

  // اگر خطا داشت، پیام نمایش بده
  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  }

  // اگر سفارشی نبود
  if (!orders || orders.length === 0) {
    return <div style={{ padding: '2rem' }}>هیچ سفارشی یافت نشد.</div>;
  }

  // رندر جدول با حداکثر ایمنی (هر جا داده نبود، خط تیره نشان بده)
  try {
    return (
      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
          {orders.map((order) => {
            // برای هر سفارش، یک بلاک try-catch جداگانه تا اگر یک مورد خراب بود، بقیه نمایش داده شوند
            try {
              const user = order.user || {};
              const cart = order.cart || [];
              return (
                <tr key={order._id || Math.random()}>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>
                    {(user.country || '-')} - {(user.city || '-')} - {(user.postalCode || '-')}
                  </td>
                  <td>{user.address || '-'}</td>
                  <td>{enTofaNum(user.phoneNumber || '')}</td>
                  <td>{enTofa(order.totalPrice) || '-'}</td>
                  <td>{order.paymentStatus || '-'}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('fa-IR')
                      : order.createAt
                      ? new Date(order.createAt).toLocaleDateString('fa-IR')
                      : '-'}
                  </td>
                  <td>
                    {cart.map((item, idx) => (
                      <div key={idx} className="mb-1">
                        <strong>{item.title || 'بدون نام'}</strong>
                        <span className="text-gray-500"> (تعداد: {item.quantity || 0})</span>
                      </div>
                    ))}
                  </td>
                </tr>
              );
            } catch (err) {
              // اگر یک سفارش مشکل داشت، یک ردیف خطا نشان بده
              return (
                <tr key={order._id || Math.random()}>
                  <td colSpan="9" style={{ color: 'red' }}>
                    خطا در نمایش این سفارش
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    );
  } catch (err) {
    // اگر کل جدول مشکل داشت، یک پیام ساده نشان بده
    return <div style={{ padding: '2rem', color: 'red' }}>خطا در نمایش جدول سفارشات</div>;
  }
}
