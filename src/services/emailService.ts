import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = 'service_lhutv6w';
const TEMPLATE_ID = 'template_gnfcdat';
const PUBLIC_KEY = 'Dvvd7uv3oERbrebKR';

/**
 * Send a contact form email
 * @param name Sender's name
 * @param email Sender's email
 * @param subject Email subject
 * @param message Email message
 * @returns Promise with the result
 */
export const sendContactEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      to_email: 'contact@georgianlanguage.online'
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};