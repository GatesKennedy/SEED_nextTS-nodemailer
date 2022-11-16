import { TestData } from '../pages/api/testEmail'

export const sendTestEmail = async (data: TestData) => {
	console.log('api.ts > sendTestEmail()...');
	fetch('/api/testEmail', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}).then((res) => {
		console.log('api.ts > sendTestEmail() > fetch().then()...');
		if (!res.ok) {
			throw new Error('Failed to send message');
		}
		return res.json();
	});
};
