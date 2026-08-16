import constants from "../constants/constants.js";

export const forgotPasswordTemplate = (name, resetUrl) => {
  return `
  <div
    style="
      background-color: #f8f5f2;
      padding: 40px 20px;
      font-family: Arial, sans-serif;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: auto;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
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
            color: #ffffff;
            margin: 0;
            font-size: 32px;
          "
        >
          ${constants.APPICATION_NAME} 🍪
        </h1>

        <p
          style="
            color: #f3d7b6;
            margin-top: 10px;
            font-size: 16px;
          "
        >
          Freshly Baked Happiness
        </p>
      </div>

      <!-- Body -->
    <div
        style="
            padding: 30px;
            color: #333;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        "
        >

        <h2
            style="
            margin-top: 0;
            font-size: 28px;
            color: #2b1d16;
            font-weight: 700;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
        >
            Reset Your Password 🔐
        </h2>

        <p
            style="
            line-height: 1.8;
            font-size: 16px;
            color: #444;
            margin: 16px 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
        >
            Hi <strong>${name}</strong>,
        </p>

        <p
            style="
            line-height: 1.8;
            font-size: 16px;
            color: #444;
            margin: 16px 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
        >
            We received a request to reset the password for your
            <strong>${constants.APPICATION_NAME}</strong> account.
        </p>

        <p
            style="
            line-height: 1.8;
            font-size: 16px;
            color: #444;
            margin: 16px 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
        >
            Click the button below to create a new password.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 35px 0;">

            <a
            href="${resetUrl}"
            style="
                background: #d98b2b;
                color: #ffffff;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 8px;
                display: inline-block;
                font-weight: 700;
                font-size: 15px;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
            >
            Reset Password
            </a>

        </div>

        <p
            style="
            line-height: 1.8;
            color: #666;
            font-size: 14px;
            margin: 14px 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
        >
            This reset link will expire in
            <strong>15 minutes</strong>.
        </p>

        <p
            style="
            line-height: 1.8;
            color: #666;
            font-size: 14px;
            margin: 14px 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
        >
            If you didn’t request a password reset, you can safely ignore this
            email.
        </p>

        <p
            style="
            margin-top: 32px;
            font-size: 15px;
            color: #333;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            "
        >
            Team ${constants.APPICATION_NAME} 🍪
        </p>

        </div>

      <!-- Footer -->
      <div
        style="
          background: #f3f3f3;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #777;
        "
      >
        © ${new Date().getFullYear()} ${constants.APPICATION_NAME}.
        All rights reserved.
      </div>

    </div>
  </div>
  `;
};
