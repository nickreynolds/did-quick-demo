import React, { useEffect, useState } from "react";
import "./App.css";

import { agent } from "./veramo/setup";
import {
	Box,
	Button,
	FormControl,
	Grid2,
	IconButton,
	Link,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import type { IIdentifier } from "@veramo/core-types";
import { ContentCopy, FileCopy } from "@mui/icons-material";

function TechnicalDetails() {
	return (
		<Box component="form" sx={{ display: "block" }}>
			<Stack spacing={2}>
				<Typography variant="h5" gutterBottom color="primary">
					Intro
				</Typography>
				<Typography variant="body1">
					did:quick is designed to be a cheap and decentralized DID method. It
					utilizes Verifiable Credentials, Witness Protocol, and Arweave to
					allow user ownership of DIDs at a higher scale than traditional
					blockchain-based DID methods.
				</Typography>
				<Typography variant="h5" gutterBottom color="primary">
					Spec
				</Typography>
				<Typography variant="body1">
					The did:quick specification is available{" "}
					<Link href="https://cosign2.witness.co/user/did:pkh:eip155:1:0xDeA9d6AD21C2893EeFd84C1F81A9a5608C05569b/post/did%3Aquick">
						here
					</Link>
				</Typography>
				<Typography variant="h5" gutterBottom color="primary">
					Notes
				</Typography>
				<Typography variant="body1">
					This demo does not currently implement the full did:quick spec. It
					only currently allows users to add keys, but eventually will support
					removing keys and adding service endpoints.
				</Typography>
			</Stack>
		</Box>
	);
}

export default TechnicalDetails;
