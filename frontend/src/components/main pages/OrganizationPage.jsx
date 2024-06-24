import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext,TabList,TabPanel} from '@mui/lab';
import User from "../../Layout/User"
import ActiveUser from '../../Layout/ActiveUser';
import ExpireUser from '../../Layout/ExpireUser';
const OrganizationPage = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{width:"80vw",height:"80vh",padding:10}}>
 
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Users" value="1" />
            <Tab label="Active Plans" value="2" />
            <Tab label="Expire Plans" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><User/></TabPanel>
        <TabPanel value="2"><ActiveUser/></TabPanel>
        <TabPanel value="3"><ExpireUser/></TabPanel>
       
      </TabContext>
    </Box>
    </div>
  );
}
export default OrganizationPage