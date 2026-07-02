export const dynamic = 'force-dynamic';
import { enTofa, enTofaNum } from "../../utils/Utilities";

export default async function Order() {
  // ۱. ساخت URL با اطمینان از وجود پروتکل (https://)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adminpanelhshs-git-master-mohammadreza-138171-projects.vercel.app";
  // اگر baseUrl با http:// یا https:// شروع نشد، https:// را اضافه کن
  const fullBase = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
  const url = `${fullBase}/api/orders`;

  let orders = [];
  let error = null;

  // ۲. مدیریت خطا با try-catch
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    orders = await response.json();
  } catch (err) {
    error = 'خطا در دریافت لیست سفارشات. لطفاً بعداً تلاش کنید.';
    console.error('Fetch error:', err);
  }

  // ۳. نمایش پیام خطا در صورت وجود
  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  }

  // ۴. اگر سفارشی وجود نداشت
  if (!orders || orders.length === 0) {
    return <div style={{ padding: '2rem' }}>هیچ سفارشی یافت نشد.</div>;
  }

  // ۵. نمایش جدول با بررسی وجود فیلدها (optional chaining)
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
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.user?.name || '-'}</td>
            <td>{order.user?.email || '-'}</td>
            <td>
              {order.user?.country || '-'} - {order.user?.city || '-'} - {order.user?.postalCode || '-'}
            </td>
            <td>{order.user?.address || '-'}</td>
            <td>{enTofaNum(order.user?.phoneNumber || '')}</td>
            <td>{enTofa(order.totalPrice)}</td>
            <td>{order.paymentStatus || '-'}</td>
            <td>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("fa-IR")
                : '-'}
            </td>
            <td>
              {order.cart?.map((item, index) => (
                <div key={index} className="mb-1">
                  <strong>{item.title}</strong>
                  <span className="text-gray-500"> (تعداد: {item.quantity})</span>
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
