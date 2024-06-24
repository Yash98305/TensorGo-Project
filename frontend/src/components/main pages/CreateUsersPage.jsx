import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import axios from 'axios';
import CreateUser from '../../Layout/CreateUser';
import AllUser from '../../Layout/AllUser';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const CreateUsersPage = () => {
  const { api, auth } = useAuth();
  const [user,setUser] = useState();
  const [refresh,setRefresh] = useState(true);
  const [value, setValue] = useState('1');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activePlanId = queryParams.get('activePlanId');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userGet = async () => {
    try {
      const res = await axios.get(`${api}/auth/user-get/${activePlanId}` );
      setUser(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userGet();
  }, [auth, api,refresh]);
  return (
    <div style={{ width: '80vw', height: '80vh', padding: 10 }}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Create Users" value="1" />
              <Tab label="All Users" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CreateUser activePlanId={activePlanId} limit = {user?.userLimit} userGet={userGet} len = {user?.users?.length} setRefresh={setRefresh} refresh={refresh}/>
          </TabPanel>
          <TabPanel value="2">
            <AllUser user = {user?.users} userGet={userGet} setRefresh={setRefresh} refresh={refresh} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default CreateUsersPage;
