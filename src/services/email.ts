import { getMailGunClient } from "../lib/mailgun";

export async function sendEmail(to: string[], subject: string, html: string) {
	try {
		const DOMAIN = process.env.DOMAIN || "";
		const mg = getMailGunClient();
		const response = await mg.messages.create(DOMAIN, {
			from: `<noreply@${DOMAIN}>`,
			to,
			subject,
			html
		});
		console.log(response);
    return true;
	} catch (err) {
		console.error(err);
	}
}
