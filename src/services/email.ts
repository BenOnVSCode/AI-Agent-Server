import { Resend } from 'resend';



export async function sendEmail(emails:string[], subject:string, html:string) {
	const API_KEY = process.env.RESEND_API_KEY;
	if(!API_KEY) throw Error("Api key not valid")
  const resend = new Resend(API_KEY);
	const { data, error } = await resend.emails.send({
    from: 'AI Call <ai-calls@elderlyaid.co.uk>',
    to: [...emails],
    subject,
    html,
  });
  if (error) {
    return console.error({ error });
  }
  console.log({ data });
}
