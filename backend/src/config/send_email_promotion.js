const sgMail = require('@sendgrid/mail');
const { SEND_GRID_API_KEY, SEND_SENDER_MAIL } = require('./envfile'); 


const sendEmailPromotion = async (res, email, url, subject, message, title) => {
  sgMail.setApiKey(SEND_GRID_API_KEY);

  const emailContent = {
    to: email,
    from: SEND_SENDER_MAIL,
    subject: subject,
    text: message,
    html: `
      <div>
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `,
  };

  try {
    await sgMail.send(emailContent);
    // Send a success response
    res.status(200).json({ status: 'SUCCESS', message: `Promotion email sent to ${email} successfully` });
    return true; // Indicates that a response has been sent
  } catch (error) {
    console.error('Error sending promotion email:', error);
    if (!res.headersSent) {
      res.status(500).json({ status: 'ERROR', message: 'Failed to send promotion email. Please try again later.' });
    }
    return false; // Indicates that a response has not been sent
  }
};
module.exports = sendEmailPromotion;
