import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext,TabList,TabPanel} from '@mui/lab';
import AllUser from '../../Layout/AllUser';
import CreateUser from '../../Layout/CreateUser';
const UserCreatePage = () => {

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
            <Tab label="Create Users" value="1" />
            <Tab label="All Users" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><CreateUser/></TabPanel>
        <TabPanel value="2"><AllUser/></TabPanel>
       
      </TabContext>
    </Box>
    </div>
  );
}
export default UserCreatePage