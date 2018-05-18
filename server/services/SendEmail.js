const Mailjet = require('node-mailjet').connect(process.env.MAILJET_PUB_KEY, process.env.MAILJET_SECRET_KEY);

/**
* If we have a message, receive it here, and send it to our Email func
*
* @param  {string} msg   Our msg
* @param  {string} cb   Send msg to our Email fun
*/
const SendEmail = (payload) => {
  // Parse Buffer for further formatting
  const data = JSON.parse(payload.content);
  const processedData = JSON.parse(data);

  let body = '';
  Object.keys(processedData).forEach(key => body += `${key}: ${processedData[key]} `);

  try {
    const request = Mailjet
      .post('send')
      .request({
        FromEmail: 'hello@angelina-marie.com',
        FromName: 'Angelina Bethoney',
        Subject: 'New User Signup!',
        'Text-part': body,
        Recipients: [{ Email: 'dscodetest@mailinator.com' }],
      });
  } catch (err) {
    console.log(`[MAILJET] error: ${err.message}`);
  }
};

module.exports = SendEmail;
