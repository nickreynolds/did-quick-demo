import React, { useEffect, useState } from 'react'
import './App.css'


import { agent } from './veramo/setup'
import { Box, Button, FormControl, Grid2, MenuItem, Select } from '@mui/material'
import ManageSelectedDID from './ManageSelectedDID'

function ManageDIDs() {
  const [managedDIDs, setManagedDIDs] = useState<any>([])
  const [selectedDID, setSelectedDID] = useState<any>("")

  const generate = async () => {
    const doc = await agent.didManagerCreate({ provider: 'did:quick'})
    getManagedDIDs();
  }

  const getManagedDIDs = async () => {
    const managedDIDs = await agent.didManagerFind();

    const quickDIDs = managedDIDs.filter((did: any) => did.provider === 'did:quick')
    const quickDIDDids = quickDIDs.map((did: any) => did.did)

    setManagedDIDs(quickDIDDids)

    if (quickDIDDids.length > 0 && !selectedDID) {
      console.log("Setting selected DID: ", quickDIDDids[0])
      setSelectedDID(quickDIDDids[0])
    }

  }

  useEffect(() => {
    console.log("do something.")
    getManagedDIDs()
  }, [])

  const defaultDID = managedDIDs.length > 0 ? managedDIDs[0] : ""
  console.log("defaultDID: ", defaultDID)

  return (
    <Box component="form" sx={{ display: 'block'}}>
    <Grid2 container={true} sx={{ width: 1, justifyContent: 'center' }}>
    <Box>
      <FormControl>
        <Select labelId="demo-select-did-label" id="demo-select-did" defaultValue={defaultDID} value={selectedDID} onChange={(e) => setSelectedDID(e.target.value)}>
          {managedDIDs.map((did: any) => <MenuItem key={did} value={did}>{did}</MenuItem>)}
        </Select>
      </FormControl>
      <Button onClick={generate}>Generate new Quick DID</Button>
    </Box>

    </Grid2>
    {selectedDID && <ManageSelectedDID selectedDID={selectedDID} />}
  </Box>
  )
}

export default ManageDIDs