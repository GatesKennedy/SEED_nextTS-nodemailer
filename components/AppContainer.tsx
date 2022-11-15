import React from 'react';
import { Container } from '@chakra-ui/react';

type childProps = {
	children: JSX.Element;
};

const AppContainer = ({ children }: childProps) => {
	return (
		<Container
			textAlign='center'
			fontSize='2xl'
			p='1em'
		>
			{children}
		</Container>
	);
};

export default AppContainer;
