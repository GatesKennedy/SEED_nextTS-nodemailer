import React from 'react';
import { Button, Container, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { sendTestEmail } from '../lib/api';

type ExValues = {
	testValue: string;
};
export type ExState = {
	isLoading: boolean;
	values: ExValues;
};

const initValues = { testValue: 'testValue' };
const initState: ExState = {
	isLoading: false,
	values: initValues,
};

export default function Home() {
	const toast = useToast();
	const [state, setState] = useState(initState);

	const { values, isLoading } = state;

	const onSubmit = async () => {
		console.log('onSubmit()...');
		setState((prev) => ({
			...prev,
			isLoading: true,
		}));

		console.log('\n> Test Submit!\n');
		try {
			await sendTestEmail(values);
			setState(initState);
			toast({
				title: 'Message sent.',
				status: 'success',
				duration: 2000,
				position: 'top',
			});
		} catch (error) {
			setState((prev) => ({
				...prev,
				isLoading: false,
			}));
		}
	};
	return (
		<Container>
			<Heading
				mt={12}
				mb={12}
			>
				AutoMailer Mgmt
			</Heading>
			<Container
				mt={12}
				mb={12}
			>
				<Button
					variant={'outline'}
					colorScheme='blue'
					isLoading={isLoading}
					onClick={onSubmit}
				>
					Test Send
				</Button>
			</Container>
		</Container>
	);
}
