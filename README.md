## 사용 모듈
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemailer](https://nodemailer.com/about/)  
- [node-crone](https://www.npmjs.com/package/node-cron)

## 사용 API
- [한국환경공단 에어코리아 대기오염정보](https://www.data.go.kr/data/15073861/openapi.do)

## .env instructions

```txt
SENDER_ADDRESS=발송_이메일_주소
RECEIVER_ADDRESS=수신_이메일_주소
APP_PASSWORD=구글_App_password
API_KEY=에어코리아_OpenAPI_서비스키
```
- 본인의 Google 계정(=이메일을 발송할 계정)을 통해 App passwords 생성 후, 발급받은 password를 APP_PASSWORD 값으로 넣어준다.
- 발급받은 에어코리아 대기오염정보 API Key를 API_KEY 값으로 넣어준다.
- [Google App Passwords 생성 가이드](https://support.google.com/accounts/answer/185833?hl=ko#zippy=)
- [에어코리아 OpenAPI 이용 가이드](https://www.airkorea.or.kr/web/board/5/329/?pMENU_NO=144)

## node-cron
아래 형식에 맞추어 이메일 발송 시간을 변경할 수 있다.

### node-cron syntax (scheduler):
```txt
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

### Example:
```js
var cron = require('node-cron');

 cron.schedule('30 22 * * *', () => {
   console.log('Running a job at 22:30 at Asia/Seoul timezone');
 }, {
   scheduled: true,
   timezone: "Asia/Seoul"
 });
```

## Sent Email Example:  
<img width="774" alt="Screen Shot 2021-08-26 at 12 13 10 AM" src="https://user-images.githubusercontent.com/29108753/130818024-ab8d4fb3-616c-4fbd-85c2-a6690a909f03.png">

- Location: 측정소 지역 이름
- Time: 최신 측정 시간
- PM10: 미세먼지 농도
