var nodemailer =require("nodemailer")
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'gordontaaj@gmail.com',
           pass: 'Tegtag12485800'
       }
   });

   const mailOptions = {
    from: 'gordontaaj@gmail.com', // sender address
    to: 'to@email.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });