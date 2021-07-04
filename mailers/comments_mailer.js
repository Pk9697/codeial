//all the comments related mail will be put up over here
const nodeMailer=require('../config/nodemailer');


//need to create a fxn which will send that mail
//another way of exporting a method also using arrow fxns
exports.newComment=(comment)=>{//whenever a new comment is made we need to call this mail
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'kumar.prashant152@gmail.com',//from which user need to be sent?
        to: comment.user.email, //sending mails to the person who has commented //in case of posts who has posted it would be comment.post.user.email
        subject:"New Comment published",
        html: '<h1>Yup, your comment is now published</h1>' //hardcoded html as of now
    },(err,info)=>{//callback arrow fxn //info carries the information about the request that is being sent 
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}