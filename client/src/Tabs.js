import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function MyTabs() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) =>  setValue(newValue);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" id={`simple-tabpanel-0`} />
          <Tab label="Item Two" id={`simple-tabpannel-1`} />
          <Tab label="Item Three" id={`simple-tabpanel-2`} />
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={value !== 0} aria-labelledby={`simple-tab-${0}`} >
        {value === 0 && (<Box sx={{ p: 3 }}> <Typography>Tab 1</Typography></Box>)}
      </div>
      <div role="tabpanel" hidden={value !== 1}  aria-labelledby={`simple-tab-${1}`} >
        {value === 1 && ( <Box sx={{ p: 3 }}> <Typography>Tab 2</Typography></Box>)}
      </div>
      <div role="tabpanel" hidden={value !== 2} aria-labelledby={`simple-tab-${2}`}>
        {value === 2 && (<Box sx={{ p: 3 }}> <Typography>Tab 3</Typography> </Box> )}
      </div>
    </Box>
  );
}