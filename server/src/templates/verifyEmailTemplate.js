// templates/verifyEmailTemplate.js

const verifyEmailTemplate = ({ name, otp }) => {
  return `
    <div
      style="
        background: #fff6ec;
        padding: 40px 20px;
        font-family: Arial, sans-serif;
      "
    >
      <div
        style="
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
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
        <div style="padding: 20px">
          <h2 style="color: #2b1d16; margin-top: 0">Verify Your Email</h2>

          <p style="color: #555; line-height: 20px; font-size: 16px">
            Hello ${name},
          </p>

          <p style="color: #555; line-height: 20px; font-size: 16px">
            Use the verification code below to verify your email address.
          </p>

          <!-- OTP -->
          <div style="margin: 40px 0; text-align: center">
            <span
              style="
                display: inline-block;
                background: #fff1dd;
                color: #d98b2b;
                padding: 18px 40px;
                font-size: 36px;
                font-weight: bold;
                border-radius: 18px;
                letter-spacing: 10px;
              "
            >
              ${otp}
            </span>
          </div>

          <p style="color: #777; line-height: 20px">
            This code will expire in
            <strong>10 minutes</strong>.
          </p>

          <p style="color: #777; line-height: 20px">
            If you did not request this, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div
          style="
            background: #fff6ec;
            padding: 20px;
            text-align: center;
            color: #888;
            font-size: 14px;
          "
        >
          © 2026 Midnight Cookies. All rights reserved.
        </div>
      </div>
    </div>
  `;
};

export default verifyEmailTemplate;
