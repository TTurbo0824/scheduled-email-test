require('dotenv').config();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const apiKey = process.env.API_KEY;
const location = "은평구";
const rowNum = 5;
const encodedLocation = encodeURIComponent(location);
const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodedLocation}&dataTerm=month&pageNo=1&numOfRows=${rowNum}&returnType=json&serviceKey=${apiKey}`;

// 한국 시간 기준, 매일 10:30PM에 아래 스크립트 실행
cron.schedule('30 22 * * *', () => {
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            // console.log(res.response.body.items);
            console.log(`Location: ${location}\nTime: ${res.response.body.items[0].dataTime}\nPM10: ${res.response.body.items[0].pm10Value}`);
            const mailBody = `Location: ${location}\nTime: ${res.response.body.items[0].dataTime}\nPM10: ${res.response.body.items[0].pm10Value}`;

            // email message options
            const mailOptions = {
                from: process.env.SENDER_ADDRESS,
                to: process.env.RECEIVER_ADDRESS,
                subject: 'Email from Node_App',
                text: mailBody
            };

            // email transporter configuration
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_ADDRESS,
                    pass: process.env.APP_PASSWORD
                }
            });

            // send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email has sent: ' + info.response);
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
}, {
    schedule: true,
    timeZone: "Asia/Seoul"
})