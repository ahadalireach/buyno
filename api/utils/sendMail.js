const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const isActivation = !!options.activationUrl;
  const isSeller =
    options.subject && options.subject.toLowerCase().includes("seller");
  const entityLabel = isSeller ? "Seller Account" : "Account";
  const entityLabelLower = isSeller ? "seller account" : "account";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mainColor = "#374151";
  const buttonColor = "#1f2937";
  const buttonHover = "##E0E0E0";

  let html;
  if (isActivation) {
    html = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0000000d; overflow: hidden;">
          <div style="background: ${mainColor}; padding: 24px 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 2rem;">Buyno Marketplace</h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: ${mainColor}; margin-top: 0;">Activate your ${entityLabelLower}</h2>
            <p style="color: #374151; font-size: 1rem;">
              Hello <b>${options.name || "there"}</b>,
            </p>
            <p style="color: #374151; font-size: 1rem;">
              Thank you for registering on our marketplace! Please click the button below to activate your ${entityLabelLower}.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${options.activationUrl}"
                style="background: ${buttonColor}; color: #fff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 1rem; display: inline-block; transition: background 0.2s;"
                onmouseover="this.style.background='${buttonHover}'"
                onmouseout="this.style.background='${buttonColor}'"
              >
                Activate ${entityLabel}
              </a>
            </div>
            <p style="color: #6b7280; font-size: 0.95rem;">
              If you did not create a ${entityLabelLower}, you can safely ignore this email.
            </p>
          </div>
          <div style="background: #f3f4f6; padding: 16px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
            &copy; ${new Date().getFullYear()} Buyno Marketplace. All rights reserved.
          </div>
        </div>
      </div>
    `;
  } else {
    html = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0000000d; overflow: hidden;">
          <div style="background: ${mainColor}; padding: 24px 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 2rem;">Buyno Marketplace</h1>
          </div>
          <div style="padding: 32px;">
            <p style="color: #374151; font-size: 1rem;">
              ${options.message}
            </p>
          </div>
          <div style="background: #f3f4f6; padding: 16px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
            &copy; ${new Date().getFullYear()} Buyno Marketplace. All rights reserved.
          </div>
        </div>
      </div>
    `;
  }

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message || options.text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
