import moment from "moment";

const getAddressLines = (address = {}) =>
  [
    address.fullName,
    address.address,
    [address.city, address.state].filter(Boolean).join(", "),
    address.pincode,
    address.phone,
  ].filter(Boolean);

const BillDocument = ({ order, contentRef }) => {
  const customerName = order.userId?.name || order.customer || "Customer";
  const addressLines = getAddressLines(order.shippingAddress);
  const deliveryAgent = order.deliveryAgent;
  const items = order.items || [];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.finalPrice || 0),
    0,
  );

  return (
    <div ref={contentRef} className="bill-print-root">
      <style>{`
        .bill-print-root { max-width: 760px; margin: 0 auto; padding: 32px; color: #34221b; font-family: Georgia, serif; background: white; }
        .bill-print-root .bill-top { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #a15c38; padding-bottom: 20px; }
        .bill-print-root h1 { margin: 0; color: #a15c38; font-size: 28px; }
        .bill-print-root h2 { margin: 0 0 6px; font-size: 18px; }
        .bill-print-root p { margin: 4px 0; color: #71584b; font-size: 13px; }
        .bill-print-root .bill-meta { text-align: right; }
        .bill-print-root .bill-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin: 28px 0; }
        .bill-print-root table { width: 100%; border-collapse: collapse; margin-top: 18px; }
        .bill-print-root th, .bill-print-root td { padding: 11px 8px; border-bottom: 1px solid #ead9cb; text-align: left; font-size: 13px; }
        .bill-print-root th { color: #a15c38; font-size: 12px; text-transform: uppercase; }
        .bill-print-root td:nth-child(3), .bill-print-root td:nth-child(4), .bill-print-root th:nth-child(3), .bill-print-root th:nth-child(4) { text-align: right; }
        .bill-print-root .bill-summary { width: 280px; margin: 24px 0 0 auto; }
        .bill-print-root .bill-summary div { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
        .bill-print-root .bill-grand { border-top: 2px solid #a15c38; color: #a15c38; font-size: 18px !important; font-weight: bold; margin-top: 6px; padding-top: 12px !important; }
        .bill-print-root .bill-footer { border-top: 1px solid #ead9cb; margin-top: 36px; padding-top: 14px; text-align: center; }
        @media print { .bill-print-root { max-width: none; padding: 0; } }
      `}</style>

      <header className="bill-top">
        <div>
          <h1>Midnight Cookies</h1>
          <p>Freshly baked, thoughtfully delivered</p>
        </div>
        <div className="bill-meta">
          <h2>Order Bill</h2>
          <p>Order #{order.orderId}</p>
          <p>{moment(order.createdAt).format("MMMM D, YYYY")}</p>
        </div>
      </header>

      <section className="bill-columns">
        <div>
          <h2>Bill To</h2>
          <p>{customerName}</p>
          <p>{order.userId?.email}</p>
        </div>
        <div>
          <h2>Delivery Address</h2>
          {addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Weight</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id || `${item.name}-${index}`}>
              <td>{item.name}</td>
              <td>{item.weight}</td>
              <td>{item.quantity}</td>
              <td>₹{item.finalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="bill-summary">
        <div>
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div>
          <span>Payment</span>
          <span>{order.paymentMethod}</span>
        </div>
        <div>
          <span>Payment Status</span>
          <span>{order.paymentStatus}</span>
        </div>
        <div className="bill-grand">
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </section>

      {deliveryAgent && (
        <section style={{ marginTop: 28 }}>
          <h2>Delivery Partner</h2>
          <p>
            {deliveryAgent.name} · {deliveryAgent.partner} ·{" "}
            {deliveryAgent.phone}
          </p>
        </section>
      )}

      <footer className="bill-footer">
        <p>Thank you for ordering from Midnight Cookies.</p>
      </footer>
    </div>
  );
};

export default BillDocument;
