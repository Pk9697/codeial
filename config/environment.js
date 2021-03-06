const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development={
    name: 'development',
    asset_path: './assets', //use ./assets not /assets
    session_cookie_key: 'blahsomething',
    db: 'codeial_db',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',//when we need to send mails they created this domain for us to interact with as developers
        port: 587,
        secure: false,
        auth: {//my own gmail for authentication as to who is requesting for mailer service which google can know otherwise anyone will be able to send email to any other person which a server can not handle or its spamming which google can track also google can charge if request is too many so you need a subscription plan for it
            user: 'kumar.prashant152',
            pass: 'riveramazon'
        }
    },
    google_client_id: "487155672086-ch9bujqsptrus9q8b05t0169e54obsu6.apps.googleusercontent.com",
    google_client_secret: "NDIutdRv-1oSQB3WlkiHMVNh",
    google_call_back_url: "http://localhost:5000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode:'dev',
        options:{stream: accessLogStream}
    }
}

const production={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH, //use ./assets not /assets
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',//when we need to send mails they created this domain for us to interact with as developers
        port: 587,
        secure: false,
        auth: {//my own gmail for authentication as to who is requesting for mailer service which google can know otherwise anyone will be able to send email to any other person which a server can not handle or its spamming which google can track also google can charge if request is too many so you need a subscription plan for it
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode:'combined',
        options:{stream: accessLogStream}
    }
}

// module.exports=production;
//eval evaluates a string into expression //*here if string is development it will evaluate it into variable
module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);