import constants from "../constants/constants.js";

const newsletterSubscribeTemplate = (verificationUrl) => {
  return `
    <div
      style="
        background:#FFF6EC;
        padding:40px 20px;
        font-family:Arial,sans-serif;
      "
    >
      <div
        style="
          max-width:600px;
          margin:auto;
          background:#ffffff;
          border-radius:24px;
          overflow:hidden;
          box-shadow:0 10px 30px rgba(0,0,0,0.08);
        "
      >
        <!-- Header -->
        <div
          style="
            background:#2B1D16;
            padding:35px 20px;
            text-align:center;
          "
        >
          <h1
            style="
              color:#ffffff;
              margin:0;
              font-size:32px;
            "
          >
            ${constants.APPICATION_NAME} 🍪
          </h1>

          <p
            style="
              color:#F3D7B6;
              margin-top:10px;
              font-size:16px;
            "
          >
            Freshly Baked Happiness
          </p>
        </div>

        <!-- Body -->
        <div style="padding:40px 32px;">
          <h2
            style="
              color:#2B1D16;
              margin-top:0;
            "
          >
            Confirm Your Subscription
          </h2>

          <p
            style="
              color:#555;
              font-size:16px;
              line-height:26px;
            "
          >
            Thank you for subscribing to <strong>${constants.APPICATION_NAME}</strong>!
          </p>

          <p
            style="
              color:#555;
              font-size:16px;
              line-height:26px;
            "
          >
            Please confirm your email address to receive notifications about:
          </p>

          <ul
            style="
              color:#555;
              font-size:16px;
              line-height:28px;
              padding-left:20px;
            "
          >
            <li>🍪 Fresh cookie drops</li>
            <li>🎉 New flavors and launches</li>
            <li>🔥 Limited-time offers</li>
            <li>💛 Special updates from ${constants.APPICATION_NAME}</li>
          </ul>

          <div style="text-align:center;margin:40px 0;">
            <a
              href="${verificationUrl}"
              style="
                display:inline-block;
                background:#D98B2B;
                color:#ffffff;
                text-decoration:none;
                padding:16px 36px;
                border-radius:999px;
                font-size:16px;
                font-weight:bold;
              "
            >
              Confirm Subscription
            </a>
          </div>

          <p
            style="
              color:#777;
              font-size:15px;
              line-height:24px;
            "
          >
            If the button doesn't work, copy and paste this link into your browser:
          </p>

          <p
            style="
              word-break:break-all;
              color:#D98B2B;
              font-size:14px;
            "
          >
            ${verificationUrl}
          </p>

          <p
            style="
              color:#777;
              font-size:15px;
              line-height:24px;
            "
          >
            This confirmation link will expire in <strong>10 minutes</strong>.
          </p>

          <p
            style="
              color:#777;
              font-size:15px;
              line-height:24px;
            "
          >
            If you didn't request these notifications, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div
          style="
            background:#FFF6EC;
            padding:24px;
            text-align:center;
            color:#888;
            font-size:14px;
          "
        >
          © ${new Date().getFullYear()} ${constants.APPICATION_NAME}. All rights reserved.
        </div>
      </div>
    </div>
  `;
};

export default newsletterSubscribeTemplate;
