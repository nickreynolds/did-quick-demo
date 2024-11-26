import React, { useEffect, useState } from 'react'
import './App.css'


import { agent } from './veramo/setup'
import { Box } from '@mui/material'

function ResolveDID() {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  return (
    <Box>resolve</Box>
  )
}

export default ResolveDID