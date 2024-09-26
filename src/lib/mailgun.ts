import formData from "form-data";
import Mailgun from "mailgun.js";
export const getMailGunClient = () => {
	const API_KEY = process.env.MAILGUN_API_KEY;
	if (!API_KEY) throw Error("No mail gun api key provided ");
	const mailgun = new Mailgun(formData);
	const mg = mailgun.client({
		username: "api",
		key: API_KEY,
		url: "https://api.eu.mailgun.net",
	});
	return mg;
};
