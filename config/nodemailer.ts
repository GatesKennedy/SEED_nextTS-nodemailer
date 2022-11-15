import nodemailer from 'nodemailer'

const srcMail = process.env.SRC_EMAIL;
const srcPass = process.env.SRC_PASS;
const targetMail = process.env.TARGET_EMAIL;

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: srcMail,
		pass: srcPass,
	},
});

export const mailOptions = {
	from: srcMail,
	to: targetMail,
};
