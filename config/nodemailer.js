const nodemailer=require('nodemailer');
const ejs=require('ejs');//rendering views which is being received
const path=require('path');
//transporter is an object which will be attached to nodemailer
//part which sends email
// part which defines how the communication is going to take place
//let testAccount = await nodemailer.createTestAccount();
const env=require('./environment');
let transporter=nodemailer.createTransport(env.smtp);

//setting template
//relative path-where the mail is being sent
//render template defines whenever i am going to send an html email where the file would be placed inside views and the mailers folder
let renderTemplate=(data,relativePath) => {
    let mailHTML;//storing what html will be sent in that mail(beautifully crafted mail)
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath), //where do i put or store email templates
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }
            mailHTML=template;

        }
    )
    return mailHTML;
}
//now exporting these 2 properties and using it wherever we are sending this email
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}