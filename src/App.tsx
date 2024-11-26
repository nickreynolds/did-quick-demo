import React, { useEffect, useState } from "react";
import "./App.css";

import { Tab, Tabs, Box } from "@mui/material";

import { agent } from "./veramo/setup";
import ResolveDID from "./ResolveDID";
import ManageDIDs from "./ManageDIDs";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";
import TechnicalDetails from "./TechnicalDetails";

const theme = createTheme({
	palette: {
		background: {
			default: "#89D2DC",
		},
		primary: {
			main: "#157A6E",
		},
		secondary: {
			main: "#89D2DC",
		},
	},
	typography: {},
});

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function App() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<header className="App-header">
					<Box>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab label="Resolve DID" {...a11yProps(0)} />
							<Tab label="Manage DIDs" {...a11yProps(1)} />
							<Tab label="Technical Details" {...a11yProps(2)} />
						</Tabs>
						<CustomTabPanel value={value} index={0}>
							<ResolveDID />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<ManageDIDs />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={2}>
							<TechnicalDetails />
						</CustomTabPanel>
					</Box>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
