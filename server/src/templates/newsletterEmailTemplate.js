import constants from "../constants/constants.js";

const newsletterEmailTemplate = ({ subject, previewText, content }) => {
  const safePreview =
    previewText?.trim() || "A special update from Midnight Cookies.";
  const safeContent = content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("<br />");

  return `
    <div style="background:#FFF6EC;padding:40px 20px;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
        <div style="background:#2B1D16;padding:32px 20px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:32px;">${constants.APPICATION_NAME} 🍪</h1>
          <p style="color:#F3D7B6;margin-top:10px;font-size:16px;">Freshly Baked Happiness</p>
        </div>

        <div style="padding:36px 32px;">
          <p style="margin:0 0 12px;color:#D98B2B;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;font-weight:bold;">
            Newsletter Update
          </p>

          <h2 style="margin:0 0 16px;color:#2B1D16;font-size:28px;line-height:1.3;">${subject}</h2>

          <p style="margin:0 0 24px;color:#5C433A;font-size:16px;line-height:26px;">${safePreview}</p>

          <div style="background:#FFF8F2;border:1px solid #F3E4D4;border-radius:16px;padding:24px;color:#2B1D16;font-size:16px;line-height:30px;">
            ${safeContent}
          </div>

          <div style="text-align:center;margin:28px 0 8px;">
            <a href="${process.env.CLIENT_URL || "https://midnight-cookies.com"}" style="display:inline-block;background:#D98B2B;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:bold;">
              Visit Midnight Cookies
            </a>
          </div>
        </div>

        <div style="background:#FFF6EC;padding:24px;text-align:center;color:#888;font-size:14px;">
          © ${new Date().getFullYear()} ${constants.APPICATION_NAME}. All rights reserved.
        </div>
      </div>
    </div>
  `;
};

export default newsletterEmailTemplate;
