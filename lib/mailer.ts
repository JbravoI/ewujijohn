import nodemailer from "nodemailer";

function getMailerConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Gmail is not configured.");
  }

  return { user, pass };
}

export async function sendContactEmails({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { user, pass } = getMailerConfig();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const safeSubject = subject.replace(/[\r\n]/g, " ");
  const messageDetails = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  await transport.sendMail({
    from: `Ewuji John website <${user}>`,
    to: user,
    replyTo: email,
    subject: `Website enquiry: ${safeSubject}`,
    text: messageDetails,
  });

  await transport.sendMail({
    from: `Ewuji John <${user}>`,
    to: email,
    subject: "Thanks for contacting Ewuji John",
    text: `Hi ${name},\n\nThanks for getting in touch. Your message has been received, and I will respond as soon as I can.\n\nBest,\nEwuji John`,
  });
}

export async function sendModuleRegistrationEmails({ name, email, month, module, expectations }: { name: string; email: string; month: string; module: string; expectations: string }) {
  const { user, pass } = getMailerConfig();
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  await transport.sendMail({ from: `Ewuji John website <${user}>`, to: user, replyTo: email, subject: `Module registration: ${module}`, text: `Name: ${name}\nEmail: ${email}\nMonth: ${month}\nModule: ${module}\n\nTraining expectations:\n${expectations}` });
  await transport.sendMail({ from: `Ewuji John <${user}>`, to: email, subject: `Registration received: ${module}`, text: `Hi ${name},\n\nThanks for registering your interest in ${module} (${month}). Your request has been received, and I will contact you with class details.\n\nBest,\nEwuji John` });
}
