
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useAuth } from '../Context/auth.js';
import axios from 'axios';
import { useEffect } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PlanListCard = ({img,title,rupee,feature,price}) => {
const {api,auth} = useAuth()
const checkout = async()=>{
try{
const res = await axios.post(`${api}/subscription/create-subscription-checkout`,{planId:price,userId : auth?.user?._id})
if (res.status === 200) {
  const { session } = res.data;
  window.location = session.url;
} else {
  console.error('Unexpected response status:', res.status);
}
}
catch(error){
  if (error.response) {
    console.error('Response data error:', error.response.data);
  } else if (error.request) {
    console.error('Request error:', error.request);
  } else {
    console.error('General error:', error.message);
 }
}}
useEffect(()=>{

},[auth?.user?._id])
  return (
    <Card sx={{ maxWidth: 345,padding:"20px 10px"}}>
      <CardHeader
    
        
        title={title}
        subheader={rupee}
      />
      <CardMedia
        component="img"
        style={{height: '250px', width: '100%',padding:"10px"}}
        image={img}
        alt="sorry"
      />
       <CardMedia>
        <Typography variant="body2" color="text.secondary" style={{padding  : "10px"}}>
        Features :
        </Typography>
      </CardMedia>
      <CardMedia>
        <Typography variant="body2" color="text.secondary" style={{padding  : "10px"}}>
        {feature}
        </Typography>
      </CardMedia>
      <Button variant="outlined" style={{width : "100%"}} onClick={()=>checkout(Number(price))}>Subscribe</Button>

      
    </Card>
  );
}
export default PlanListCard

