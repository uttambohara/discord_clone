import { Resend } from "resend";

export const sendVerificationTokenByEmail = async function (
  email: string,
  token: string
) {
  try {
    const verificationLink = `http://localhost:3000/auth/new-verification/?token=${token}`;
    const resend = new Resend("re_WYgHihx8_6e9eSmsdv4XDbcVR8wMuRkiN");

    return resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification token",
      html: `<p>Your verification token is <a  href=${verificationLink}>here</a> </strong></p>`,
    });
  } catch (err) {
    return err;
  }
};
