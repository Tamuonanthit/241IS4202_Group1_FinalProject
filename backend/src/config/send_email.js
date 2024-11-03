const sgMail = require('@sendgrid/mail');
const { SEND_GRID_API_KEY, SEND_SENDER_MAIL } = require('./envfile'); 


const sendEmail = async (res, user, url, subject, message, title) => {
  // Set the SendGrid API key from the environment variable
  sgMail.setApiKey(SEND_GRID_API_KEY);

  const emailContent = {
    to: user.email,
    from: SEND_SENDER_MAIL, 
    subject: subject, 
    text: message,
    html: `
      <div>
        <h4>${title}</h4>
        <a href="${url}" target="_blank"> >>> Click Here</a>
      </div>
    `,
  };

  try {
    // Send the email using SendGrid's service
    await sgMail.send(emailContent);

    if (!res.headersSent) {
      // On success, return a properly formatted success response
      return res.status(200).json({
        status: 'SUCCESS',
        message: `Email sent to ${user.email} successfully`,
      });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error sending email:', error);

    // Reset token and expiration fields in the database if sending the email fails
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save the user object after resetting the fields, without validation
    await user.save({ validateBeforeSave: false });

    // Check if the response has already been sent before returning
    if (!res.headersSent) {
      // Send a properly formatted error response                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      return res.status(500).json({
        status: 'ERROR',
        message: 'Failed to send email. Please try again later.',
      });
    }
  }
};
module.exports=sendEmail;

