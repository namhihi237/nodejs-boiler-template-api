import nodemailer from 'nodemailer';
import { envVariable } from '../configs/env';;

class EmailUtils {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: envVariable.EMAIL,
        pass: envVariable.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(options) {
    const mailOptions = {
      from: envVariable.EMAIL,
      to: options.email,
      subject: options.subject,
      html: options.html
    };
    return this.transporter.sendMail(mailOptions);
  }

  async sendEmailActive(options) {
    /* 
      implement this function here
    */
    return this.sendEmail(options);
  }
}

export default new EmailUtils();