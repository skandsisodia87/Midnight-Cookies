export const orderStatusEmailTemplate = ({
  customerName,
  orderId,
  orderStatus,
  items,
  totalAmount,
  viewOrderUrl
}) => {
  const statusMessages = {
    placed: {
      title: "Your Order Has Been Placed 🎉",
      message: "We’ve received your order and our bakers are getting ready!",
    },

    confirmed: {
      title: "Your Order Is Confirmed ✅",
      message:
        "Your delicious cookies are now confirmed and will be prepared shortly.",
    },

    shipped: {
      title: "Your Order Has Been Shipped 🚚",
      message: "Your cookie box is on the way to your doorstep.",
    },

    delivered: {
      title: "Order Delivered ❤️",
      message: "We hope you enjoy your freshly baked cookies!",
    },

    cancelled: {
      title: "Order Cancelled ❌",
      message:
        "Your order has been cancelled. If this was unexpected, please contact support.",
    },
  };

  const currentStatus = statusMessages[orderStatus];

  const itemsHTML = items
    .map((item) => {
      const originalTotal = item.originalPrice * item.quantity;
      const discountedTotal = item.discountPrice
        ? item.discountPrice * item.quantity
        : originalTotal;

      return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <div style="font-weight: 600; color: #2b1d16;">${item.name}</div>
          <div style="font-size: 13px; color: #777; margin-top: 4px;">${item.sku}</div>
        </td>

        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align:center;">
          ${item.quantity}
        </td>

        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align:right;">
          <div style="font-size: 14px; color: #555;">
            ₹${originalTotal}
          </div>
        </td>

        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align:right;">
          <div style="font-size: 15px; font-weight: 600; color: #2b1d16;">
            ₹${discountedTotal}
          </div>
        </td>
      </tr>
    `;
    })
    .join("");

  const fullSummary = `
    <h3 style="margin-bottom: 15px;">Order Summary</h3>

    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="
        border-collapse: collapse;
        margin-bottom: 25px;
      "
    >
      <thead>
        <tr style="background: #f3f3f3;">
          <th align="left" style="padding: 12px;">Item</th>
          <th align="center" style="padding: 12px;">Qty</th>
          <th align="right" style="padding: 12px;">Original</th>
          <th align="right" style="padding: 12px;">Discounted</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>

    <div
      style="
        text-align: right;
        font-size: 18px;
        margin-bottom: 30px;
      "
    >
      <strong>Total: ₹${totalAmount}</strong>
    </div>
  `;

  const shortSummary = `
    <div
      style="
        background: #f8f5f2;
        padding: 18px;
        border-radius: 10px;
        margin: 25px 0;
        color: #444;
      "
    >
      <p style="margin: 0 0 10px; font-size: 16px;">
        Your order contains <strong>${items.length}</strong> item${items.length === 1 ? "" : "s"} with a total of <strong>₹${totalAmount}</strong>.
      </p>
      <p style="margin: 0; font-size: 15px; color: #555;">
        For full details, please visit your order history in your account.
      </p>
    </div>
  `;

  const summarySection = orderStatus === "placed" ? fullSummary : shortSummary;

  return `
  <div
    style="
      background-color: #f5f5f5;
      padding: 40px 20px;
      font-family: Arial, sans-serif;
    "
  >

    <div
      style="
        max-width: 650px;
        margin: auto;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      "
    >

      <!-- Header -->
      <div
        style="
          background: #2b1d16;
          padding: 30px;
          text-align: center;
        "
      >
        <h1
          style="
            color: #fff;
            margin: 0;
            font-size: 32px;
          "
        >
          Midnight Cookies 🍪
        </h1>

        <p
          style="
            color: #f3d7b6;
            margin-top: 10px;
          "
        >
          Freshly Baked Happiness
        </p>
      </div>


      <!-- Body -->
      <div style="padding: 20px 30px;">

        <h2 style="margin-top: 0; color: #222;">
          ${currentStatus.title}
        </h2>

        <p style="font-size: 16px; color: #444;">
          Hello <strong>${customerName}</strong>,
        </p>

        <p style="font-size: 15px; color: #555; line-height: 1.2;">
          ${currentStatus.message}
        </p>


        <!-- Order ID -->
        <div
          style="
            background: #f8f5f2;
            padding: 15px;
            border-radius: 8px;
            margin: 25px 0;
          "
        >
          <strong>Order ID:</strong>
          ${orderId}
        </div>


        <!-- Order Summary -->
        ${summarySection}

        <!-- CTA -->
        <div style="text-align:center;">
          <a
            href=${viewOrderUrl}
            style="
              display:inline-block;
              background:#d98b2b;
              color:white;
              text-decoration:none;
              padding:14px 28px;
              border-radius:8px;
              font-weight:bold;
            "
          >
            View Your Order
          </a>
        </div>


        <!-- Footer Text -->
        <p
          style="
            margin-top: 40px;
            color: #777;
            font-size: 14px;
            line-height: 1.2;
          "
        >
          Thank you for choosing Midnight Cookies ❤️
        </p>

      </div>


      <!-- Footer -->
      <div
        style="
          background:#f3f3f3;
          text-align:center;
          padding:20px;
          color:#777;
          font-size:13px;
        "
      >
        © ${new Date().getFullYear()}
        Midnight Cookies.
        All rights reserved.
      </div>

    </div>

  </div>
  `;
};
