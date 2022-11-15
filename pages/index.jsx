import React from 'react';
import { Button, Checkbox, Container, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { sendTestEmail } from '../lib/api'

const initValues = { testValue: 'testValue' };
const initState = { isLoading: false, error: '', values: initValues };

export default function Home() {
	const toast = useToast();
	const [state, setState] = useState(initState);

	const { values, isLoading, error } = state;

	// TODO: rework for TS
	const handleChange = ({ target }) =>
		setState((prev) => ({
		...prev,
		values: {
			...prev.values,
			[target.name]: target.value,
		},
    }));

	const onSubmit = async () => {
		console.log('onSubmit()...')
		setState((prev) => ({
			...prev,
			isLoading: true
		}));

		console.log('\n> Test Submit!\n');
		try {
			await sendTestEmail(values);
			setState(initState);
			toast({
				title: "Message sent.",
				status: "success",
				duration: 2000,
				position: "top",
			});
		} catch (error) {
			setState((prev) => ({
				...prev,
				isLoading: false,
				error: error.message,
			}));
		}
	};
	return (
		<Container >
			<Heading>AutoMailer Mgmt</Heading>
			<Container >
				<FormControl isRequired mb={6}>
					{/* <Checkbox
						type='checkbox'
						name='testValue'
						isChecked={state.values.testValue}
						onChange={handleChange}
						>
						RCM Report
					</Checkbox> */}
				</FormControl>

				<Button
					variant={'outline'}
					colorScheme='blue'
					isLoading={isLoading}
					onClick={onSubmit}
					>
					Test Submit
				</Button>
			</Container>
		</Container>
	);
}
