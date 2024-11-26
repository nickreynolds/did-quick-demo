import React, { useEffect, useState } from "react";
import "./App.css";

import { agent } from "./veramo/setup";
import { Box, Button, Grid2, TextField } from "@mui/material";

function ResolveDID() {
	const [didDoc, setDidDoc] = useState<any>();

	const resolve = async () => {
		const doc = await agent.resolveDid({
			didUrl: didValue,
		});

		setDidDoc(doc);
	};

	const [didValue, setDIDValue] = React.useState("");

	const handleDIDChanged = (newValue: string) => {
		setDIDValue(newValue);
	};

	return (
		<Box component="form" sx={{ display: "block" }}>
			<Grid2 container={true} sx={{ width: 1, justifyContent: "center" }}>
				<TextField
					sx={{ width: 1 / 2 }}
					id="outlined-basic"
					label="DID"
					variant="outlined"
					onChange={(e) => handleDIDChanged(e.target.value)}
				/>
				<Button onClick={resolve}>Resolve</Button>
			</Grid2>
			<Box>
				<pre id="result">{didDoc && JSON.stringify(didDoc, null, 2)}</pre>
			</Box>
		</Box>
	);
}

export default ResolveDID;
