import nodemailer from "nodemailer";

function getMailerConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Gmail is not configured.");
  }

  return { user, pass };
}

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function isTemporaryGmailError(error: unknown) {
  return typeof error === "object" && error !== null && "responseCode" in error && (error as { responseCode?: unknown }).responseCode === 421;
}

async function retryTemporaryGmailFailure<T>(send: () => Promise<T>) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await send();
    } catch (error) {
      if (!isTemporaryGmailError(error) || attempt === 2) throw error;
      await wait(1_500 * (attempt + 1));
    }
  }
  throw new Error("Email could not be sent.");
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

export async function sendModuleRegistrationEmails({ name, email, month, modules, expectations }: { name: string; email: string; month: string; modules: string[]; expectations: string }) {
  const { user, pass } = getMailerConfig();
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  const moduleList = modules.join(", ");
  await transport.sendMail({ from: `Ewuji John website <${user}>`, to: user, replyTo: email, subject: `Module registration: ${moduleList}`, text: `Name: ${name}\nEmail: ${email}\nMonth: ${month}\nModules: ${moduleList}\n\nTraining expectations:\n${expectations}` });
  await transport.sendMail({ from: `Ewuji John <${user}>`, to: email, subject: "Module registration received", text: `Hi ${name},\n\nThanks for registering your interest in these ${month} modules: ${moduleList}. Your request has been received, and I will contact you with class details.\n\nBest,\nEwuji John` });
}

export async function sendAdminEmail({ to, subject, text, attachments }: { to: string | string[]; subject: string; text: string; attachments?: { filename: string; content: string }[] }) { const { user, pass } = getMailerConfig(); const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } }); await transport.sendMail({ from: `Ewuji John <${user}>`, to, subject: subject.replace(/[\r\n]/g, " "), text, attachments }); }

export async function sendAdminBroadcastEmail({ recipients, subject, text }: { recipients: string[]; subject: string; text: string }) {
  const { user, pass } = getMailerConfig();
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  await retryTemporaryGmailFailure(() => transport.sendMail({ from: `Ewuji John <${user}>`, to: user, bcc: recipients, subject: subject.replace(/[\r\n]/g, " "), text }));
}
