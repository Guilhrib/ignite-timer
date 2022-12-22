import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

import { Router } from './Router'
import { CycleContextProvider } from './contexts/CycleContext'

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<CycleContextProvider>
					<Router />
				</CycleContextProvider>
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	)
}
