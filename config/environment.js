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
}

const production={
    name: 'production'
}

module.exports=development;
