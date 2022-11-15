import { NextApiRequest, NextApiResponse } from 'next'
import { mailOptions, transporter } from '../../config/nodemailer';
import buildTestHtml from '../../templates/buildTestEmail';

export type TestData = {
	testValue: string
}

const buildEmailContent = (data: TestData) => {
	console.log('/testEmail > buildEmailContent()...')
	const textData = `Test: Text ${JSON.stringify(data)}`;
	const htmlData = `Test: Html ${JSON.stringify(data)}`;

	return {
		text: textData,
		html: buildTestHtml(htmlData),
	};
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('/testEmail > handler()...')
	if (req.method === 'POST') {
		const data: TestData = req.body;
		if (!data || !data.testValue) {
			return res.status(400).send({message: "Bad Request Data..."});
		}

		try {
			await transporter.sendMail({
				...mailOptions,
				...buildEmailContent(data),
				subject: 'Auto Mailer Test'
			})
			console.log('/testEmail > sendMail() > Success!')
			return res.status(200).json({success: true});
		} catch(err: any) {
			console.log('/testEmail > sendMail() >  Error: ',err)
			return res.status(400).json({ message: err.message})
		}
	}

	return res.status(400).json({ message: 'Bad Request...' });
};

export default handler;

// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }
