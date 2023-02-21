import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CyclesContextProvider } from './contexts/CyclesContext';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export function App(): ReactElement {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<CyclesContextProvider>
					<Router />
				</CyclesContextProvider>
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	);
}
