require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object with SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS instead of SSL
  auth: {
    user: process.env.GMAIL_USER, // Email address from .env file
    pass: process.env.GMAIL_APP_PASSWORD, // App password from .env file
  },
  tls: {
    rejectUnauthorized: false, // Allows self-signed certificates (relax TLS)
  },
});

/**
 * Function to send approval email to parents.
 * @param {string} parentEmail - Parent's email address.
 * @param {string} studentName - Name of the student.
 * @param {string} enrollmentNumber - Enrollment number of the student.
 * @param {string} startDate - Start date of the approved leave.
 * @param {string} endDate - End date of the approved leave.
 */
const sendApprovalEmail = async (parentEmail, studentName, enrollmentNumber, startDate, endDate) => {
  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender's Gmail email address
    to: parentEmail,
    subject: 'Leave Approved for Your Child',
    text: `Dear Parent,

We are pleased to inform you that leave has been approved for your child, ${studentName} (Enrollment No: ${enrollmentNumber}), from ${startDate} to ${endDate}.

Best regards,
GEC Patan`,
    html: `<p>Dear Parent,</p>
           <p>We are pleased to inform you that leave has been approved for your child, <strong>${studentName}</strong> (Enrollment No: <strong>${enrollmentNumber}</strong>), from <strong>${startDate}</strong> to <strong>${endDate}</strong>.</p>
           <p>Best regards,<br/>GEC Patan</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${parentEmail} for ${studentName}.`);
  } catch (error) {
    console.error('Error sending approval email:', error.message);
    throw new Error('Failed to send email');
  }
};

/**
 * Function to send a complaint email to parents.
 * @param {string} parentEmail - Parent's email address.
 * @param {string} studentName - Name of the student.
 * @param {string} complaintReason - Reason for raising the complaint.
 */
const sendComplaintEmail = async (parentEmail, studentName, complaintReason) => {
  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender's Gmail email address
    to: parentEmail,
    subject: `Concern Regarding Your Child's Leave Application`,
    text: `Dear Parent,

We have some concerns regarding your child's leave application.

Student: ${studentName}
Reason for Concern: ${complaintReason}

Please contact the warden for further discussion.

Best regards,
GEC Patan`,
    html: `<p>Dear Parent,</p>
           <p>We have some concerns regarding your child's leave application.</p>
           <p>Student: <strong>${studentName}</strong></p>
           <p>Reason for Concern: <strong>${complaintReason}</strong></p>
           <p>Please contact the warden for further discussion.</p>
           <p>Best regards,<br/>GEC Patan</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Complaint email sent to ${parentEmail} for ${studentName}.`);
  } catch (error) {
    console.error('Error sending complaint email:', error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendApprovalEmail, sendComplaintEmail };
