import nodemailer from "nodemailer";
import ejs from "ejs";
import { convert } from "html-to-text";
import {
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_HOST,
} from "@/config";

interface IEmail {
  user: { name: string; email: string };
  url: string;
}

class Email {
  to: string;
  name: string;
  url: string;
  from = `CaseCobra <hello@casecobra.com>`;

  transportOptions = {
    // host: EMAIL_HOST,
    // port: Number(EMAIL_PORT),
    // secure: true,
    // auth: {
    //   user: EMAIL_USERNAME,
    //   pass: EMAIL_PASSWORD,
    // },
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "662c6db5bf7418",
      pass: "c08793f63cd588",
    },
  };

  constructor({ user, url }: IEmail) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
  }

  createTransport() {
    return nodemailer.createTransport(this.transportOptions);
  }

  async send(subject: string, html: string) {
    const mailOptions = {
      html,
      subject,
      from: this.from,
      to: this.to,
      text: convert(html),
    };

    await this.createTransport().sendMail(mailOptions);
  }

  async sendEmailActivationMail() {
    const html = await ejs.renderFile(
      __dirname + "/templates/activation-mail.ejs",
      {
        name: this.name,
        activationUrl: this.url,
      }
    );

    await this.send("Activate your account", html);
  }
}

export default Email;
