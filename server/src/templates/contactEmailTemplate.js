const contactEmailTemplate = ({ fullName, email, subject, message }) => {
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
          max-width: 650px;
          margin: auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #f1e3cf;
        "
      >
        <!-- Header -->
        <div
          style="
            background: #2b1d16;
            padding: 32px;
          "
        >
          <h1
            style="
              margin: 0;
              color: #ffffff;
              font-size: 30px;
              font-weight: bold;
            "
          >
            Midnight Cookies 🍪
          </h1>

          <p
            style="
              margin: 10px 0 0;
              color: #f3d7b6;
              font-size: 15px;
            "
          >
            New customer contact request received
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 32px">
          <h2
            style="
              margin-top: 0;
              margin-bottom: 24px;
              color: #2b1d16;
              font-size: 24px;
            "
          >
            Contact Details
          </h2>

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              border-collapse: collapse;
              margin-bottom: 28px;
            "
          >
            <tr>
              <td
                style="
                  padding: 16px;
                  background: #fff6ec;
                  border-bottom: 1px solid #f3e2cb;
                  width: 180px;
                  font-weight: 600;
                  color: #2b1d16;
                "
              >
                Full Name
              </td>

              <td
                style="
                  padding: 16px;
                  background: #fffdf9;
                  border-bottom: 1px solid #f3e2cb;
                  color: #555;
                "
              >
                ${fullName}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 16px;
                  background: #fff6ec;
                  border-bottom: 1px solid #f3e2cb;
                  font-weight: 600;
                  color: #2b1d16;
                "
              >
                Email Address
              </td>

              <td
                style="
                  padding: 16px;
                  background: #fffdf9;
                  border-bottom: 1px solid #f3e2cb;
                  color: #555;
                "
              >
                ${email}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 16px;
                  background: #fff6ec;
                  border-bottom: 1px solid #f3e2cb;
                  font-weight: 600;
                  color: #2b1d16;
                "
              >
                Subject
              </td>

              <td
                style="
                  padding: 16px;
                  background: #fffdf9;
                  border-bottom: 1px solid #f3e2cb;
                  color: #555;
                "
              >
                ${subject}
              </td>
            </tr>
          </table>

          <!-- Message Box -->
          <div
            style="
              background: #fffaf4;
              border: 1px solid #f1e3cf;
              border-radius: 18px;
              padding: 24px;
            "
          >
            <p
              style="
                margin-top: 0;
                margin-bottom: 16px;
                color: #2b1d16;
                font-size: 18px;
                font-weight: 600;
              "
            >
              Customer Message
            </p>

            <p
              style="
                margin: 0;
                color: #555;
                font-size: 16px;
                line-height: 30px;
                white-space: pre-line;
              "
            >
              ${message}
            </p>
          </div>

          <!-- Note -->
          <div
            style="
              margin-top: 28px;
              padding: 18px 20px;
              background: #fff6ec;
              border-radius: 14px;
            "
          >
            <p
              style="
                margin: 0;
                color: #777;
                font-size: 14px;
                line-height: 24px;
              "
            >
              This email was automatically generated from
              the Midnight Cookies contact form.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div
          style="
            background: #fff6ec;
            padding: 22px;
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

export default contactEmailTemplate;
