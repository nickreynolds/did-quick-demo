import React, { useEffect, useState } from 'react'
import './App.css'


import { agent } from './veramo/setup'
import { Box } from '@mui/material'

function ManageDIDs() {
  const [didDoc, setDidDoc] = useState<any>()

  const resolve = async () => {
    const doc = await agent.resolveDid({
      didUrl: 'did:quick:did:key:z6MkndAHigYrXNpape7jgaC7jHiWwxzB3chuKUGXJg2b5RSj',
    })

    setDidDoc(doc)
  }

  useEffect(() => {
    console.log("do something.")
    resolve()
  }, [])

  return (
    <Box>manage dids</Box>
  )
}

export default ManageDIDs