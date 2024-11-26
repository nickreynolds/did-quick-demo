import React, { useEffect, useState } from 'react'
import './App.css'

import { Tab, Tabs, Box } from '@mui/material'

import { agent } from './veramo/setup'
import ResolveDID from './ResolveDID';
import ManageDIDs from './ManageDIDs';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  return (
    <div className="App">
      <header className="App-header">
        {/* <pre id="result">{didDoc && JSON.stringify(didDoc, null, 2)}</pre> */}
        <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <ResolveDID />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ManageDIDs />
        </CustomTabPanel>
        </Box>
      </header>
    </div>
  )
}

export default App