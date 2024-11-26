import React, { useEffect, useState } from "react";
import "./App.css";

import { agent } from "./veramo/setup";
import {
	Box,
	Button,
	FormControl,
	Grid2,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { IIdentifier } from "@veramo/core-types";
import { ContentCopy, FileCopy } from "@mui/icons-material";

function ManageSelectedDID({ selectedDID }: { selectedDID: string }) {
	const [managedDID, setManagedDID] = useState<IIdentifier>();

	const getManagedDID = async () => {
		const managedDID = await agent.didManagerGet({ did: selectedDID });
		setManagedDID(managedDID);
	};

	const addKey = async () => {
		const key = await agent?.keyManagerCreate({
			kms: "local",
			type: "Secp256k1",
		});
		const res = await agent.didManagerAddKey({ did: selectedDID, key });
		console.log("res: ", res);
		getManagedDID();
	};

	useEffect(() => {
		console.log("do something.");
		getManagedDID();
	}, [selectedDID]);

	return (
		<Box component="form" sx={{ display: "block" }}>
			<Typography variant="h5" gutterBottom>
				{managedDID && managedDID.did}
			</Typography>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650, maxWidth: "100%" }}
					aria-label="simple table"
				>
					<TableHead>
						<TableRow>
							<TableCell sx={{ maxWidth: "100px" }}>Key ID</TableCell>
							<TableCell align="right">Type</TableCell>
							<TableCell align="right">PublicKeyHex</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{managedDID?.keys.map((row) => (
							<TableRow
								key={row.kid}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									sx={{
										maxWidth: "300px",
										display: "flex",
										alignItems: "center",
									}}
								>
									<Typography noWrap>{row.kid}</Typography>
									<IconButton
										aria-label="copy"
										onClick={() => {
											navigator.clipboard.writeText(row.kid);
										}}
									>
										<ContentCopy />
									</IconButton>
								</TableCell>
								<TableCell align="right">
									{" "}
									<Typography noWrap>{row.type}</Typography>
								</TableCell>
								<TableCell
									align="right"
									component="th"
									scope="row"
									sx={{
										maxWidth: "300px",
										display: "flex",
										alignItems: "center",
									}}
								>
									<Typography noWrap>{row.publicKeyHex}</Typography>
									<IconButton
										aria-label="copy"
										onClick={() => {
											navigator.clipboard.writeText(row.publicKeyHex);
										}}
									>
										<ContentCopy />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button onClick={addKey}>Add Key to DID</Button>
		</Box>
	);
}

export default ManageSelectedDID;
