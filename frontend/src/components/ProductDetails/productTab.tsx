import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

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

export default function ProductTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Horizontal line before the tabs */}
      <Divider sx={{ width: '100%', mb: 2 }} />
      
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example" 
          variant="scrollable"
          scrollButtons="auto" 
          sx={{ justifyContent: 'center' }} // Center the tabs
        >
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Shipping & Return Policy" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Horizontal line after the tabs */}
      <Divider sx={{ width: '100%', my: 2 }} />

      <CustomTabPanel value={value} index={0}>
        {/* Content for Details */}
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* Content for Shipping & Return Policy */}
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* Content for Reviews */}
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
