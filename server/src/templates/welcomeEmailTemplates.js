export const welcomeEmailTemplate = (name) => {
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
        <div style="background: #2b1d16; padding: 30px; text-align: center">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px">
            Midnight Cookies 🍪
          </h1>

          <p style="color: #f3d7b6; margin-top: 10px; font-size: 16px">
            Freshly Baked Happiness
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 20px; color: #333">
          <h2 style="margin-top: 0">Welcome, ${name}! 👋</h2>
          <p style="line-height: 1.2">
            Thank you for joining
            <strong>Midnight Cookies</strong>.
          </p>
          <p style="line-height: 1.2">
            We’re excited to serve you freshly baked, soft, and delicious
            cookies made with love.
          </p>
          <p style="line-height: 1.2">
            Get ready to explore our premium cookie collection and satisfy your
            sweet cravings.
          </p>
          <div style="text-align: center; margin: 20px 0">
            <a
              href="#"
              style="
                background: #d98b2b;
                color: white;
                text-decoration: none;
                padding: 14px 28px;
                border-radius: 8px;
                display: inline-block;
                font-weight: bold;
              "
            >
              Explore Cookies
            </a>
          </div>
          <p style="line-height: 1.2">
            Thank you for being part of our journey 🍪
          </p>
          <p>Team Midnight Cookies</p>
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
          © ${new Date().getFullYear()} Midnight Cookies. All rights reserved.
        </div>
      </div>
    </div>
  `;
};
