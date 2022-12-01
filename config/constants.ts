/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const  generateAccessToken = (payload) => jwt.sign(payload, 'eevvfeshfsbdfhbs')
// export const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 465,
//     secure: true,
//     pool: true,
//     auth: {
//       user: 'testmailsend431@gmail.com',
//       pass: 'uvzamfrnqsohzisv'
//     }
//   })
export const passwordGenerator = () =>{
    const list = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789";
    const specialCharacter = ["@", "#", "$", "&", "^", "!"];
    let randomString = "" ;
    for(let i =0;i<8;i++){
        randomString +=  list[Math.floor(Math.random() * list.length)]
    }
    randomString = randomString.replace(randomString[Math.floor(Math.random()*randomString.length)],specialCharacter[Math.floor(Math.random() * specialCharacter.length)])
    
    return randomString;
  }
