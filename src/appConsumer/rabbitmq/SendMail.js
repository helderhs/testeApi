import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

import 'dotenv/config';

class SendMail {
  async execute(assunto, emailEnviar, _nome, _id_pedido) {
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let _secure = false;
    if (process.env.EMAIL_SECURE === 'true') _secure = true;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: _secure, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const templateStr = fs
      .readFileSync(
        path.resolve(__dirname, '..', 'views', 'template_email.hbs')
      )
      .toString('utf8');

    const parseTemplate = handlebars.compile(templateStr);
    const data = {
      nome: _nome,
      id_pedido: _id_pedido,
    };

    const info = await transporter.sendMail({
      from: 'teste@bigboss.app.br', // sender address
      to: emailEnviar, // list of receivers
      subject: '✔ ' + assunto, // Subject line
      //text: 'Hello world?', // plain text body
      html: parseTemplate(data), // html body
    });

    console.log(
      'Email para ' +
        emailEnviar +
        ' enviado: Assunto ' +
        assunto +
        ' sent: %s ' +
        info.messageId
    );
  }
}

export default new SendMail();
