import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tahasdq99@gmail.com",
    pass: "skxr egpp yybf gejt",
  },
});
export const sendEmail = async (toEmail:string, verificationLink:string) => {
    await transporter.sendMail({
      from: "My Shop",
      to: toEmail,
      subject: "Verify your email",
      html: `
      <h2>Welcome to MyShop!</h2>
      <p>Click the button below to verify your email. This link expires in 24 hours.</p>
      <a href="${verificationLink}" 
         style="background:#4F46E5;color:white;padding:12px 24px;
                border-radius:6px;text-decoration:none;display:inline-block;">
        Verify Email
      </a>
      <p>Or copy this link: ${verificationLink}</p>
    `,
    });
};
