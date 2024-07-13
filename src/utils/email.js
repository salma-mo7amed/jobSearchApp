import nodemailer from 'nodemailer'

export const sendEmail =async (email, OTP)=>{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "helwasalma50@gmail.com",
        pass: "itnrlgkfsrdagtqr",
      },
    });
    const info = await transporter.sendMail({
    from: '"jobSearchApp👻" <helwasalma50@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: OTP, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

