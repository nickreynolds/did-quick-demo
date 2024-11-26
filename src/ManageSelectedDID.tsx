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
import type { IIdentifier } from "@veramo/core-types";
import { ContentCopy, FileCopy } from "@mui/icons-material";

function ManageSelectedDID({ selectedDID }: { selectedDID: string }) {
	const [managedDID, setManagedDID] = useState<IIdentifier>();

	const getManagedDID = async () => {
		const managedDID = await agent.didManagerGet({ did: selectedDID });
		setManagedDID(managedDID);
	};

	const addKey = async (keyType: "Secp256k1" | "Ed25519") => {
		const key = await agent?.keyManagerCreate({
			kms: "local",
			type: keyType,
		});
		const res = await agent.didManagerAddKey({ did: selectedDID, key });
		getManagedDID();
	};

	// biome-ignore lint: allow more dependencies
	useEffect(() => {
		getManagedDID();
	}, [selectedDID]);

	return (
		<Box component="form" sx={{ display: "block" }}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Typography variant="h5" gutterBottom color="primary">
					{managedDID?.did}
				</Typography>
				<IconButton
					aria-label="copy"
					onClick={() => {
						managedDID?.did && navigator.clipboard.writeText(managedDID?.did);
					}}
					color="primary"
				>
					<ContentCopy />
				</IconButton>
			</Box>
			<Box>
				<Typography variant="h6" gutterBottom color="primary.text">
					Keys
				</Typography>
			</Box>
			<Box bgcolor={"secondary.light"}>
				<TableContainer>
					<Table
						sx={{ minWidth: 650, maxWidth: "100%" }}
						aria-label="simple table"
					>
						<TableHead>
							<TableRow>
								<TableCell sx={{ maxWidth: "100px" }}>
									<Typography color="secondary.text">Key ID</Typography>
								</TableCell>
								<TableCell align="right">
									<Typography color="secondary.text">Type</Typography>
								</TableCell>
								<TableCell align="right">
									<Typography color="secondary.text">Public Key Hex</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{managedDID?.keys.map((row) => (
								<TableRow
									key={row.kid}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										<Box
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
										</Box>
									</TableCell>
									<TableCell align="right">
										{" "}
										<Typography noWrap>{row.type}</Typography>
									</TableCell>
									<TableCell align="right" component="th" scope="row">
										<Box
											sx={{
												maxWidth: "300px",
												display: "flex",
												alignItems: "center",
											}}
										>
											<IconButton
												aria-label="copy"
												onClick={() => {
													navigator.clipboard.writeText(row.publicKeyHex);
												}}
											>
												<ContentCopy />
											</IconButton>

											<Typography noWrap>{row.publicKeyHex}</Typography>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Button onClick={() => addKey("Secp256k1")}>
				Add Secp256k1 Key to DID
			</Button>
			<Button onClick={() => addKey("Ed25519")}>Add Ed25519 Key to DID</Button>
		</Box>
	);
}

export default ManageSelectedDID;
