import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const registerMail = async (req, res, next) => {
    const { username, userEmail, text, subject } = req.body;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Registeration successfull",
        text: text || "We're very pleased to have you with us as a new user of our website. Thanks for creating the account." 
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            // console.log(error)
            next(error)
        }else{
            // console.log("Email Sent: " + info.response)
            res.status(200).send({
                success: true,
                message: "A confirmation email has been sent to you. Please check your email",
                info,
                preview: nodemailer.getTestMessageUrl(info)
            })
        }
    })
    

}