// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PlanList = () => {
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await axios.get('/api/plans');
//         setPlans(res.data);
//       } catch (err) {
//         console.error(err.response.data);
//       }
//     };
//     fetchPlans();
//   }, []);

//   return (
//     <div>
//       {plans.map(plan => (
//         <div key={plan._id}>
//           <h2>{plan.name}</h2>
//           <p>{plan.description}</p>
//           <p>${plan.price}</p>
//           <ul>
//             {plan.features.map((feature, index) => (
//               <li key={index}>{feature}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PlanList;


import React from 'react'
import PlanListCard from '../Components/PlanListCard'
import img1 from "../assets/basic.png"
import img2 from "../assets/business.png"
import img3 from "../assets/pro.png"

const PlanList = () => {
  
  return (
    <>
<div style={{display:"flex",justifyContent:"space-around",alignItems:"center",height:"88vh",padding:"50px"}}>
<PlanListCard img={img1} title = {"Basic"} rupee={"Free for 14 Days"} feature = {"Limited to 1 user"} price={0}/>
<PlanListCard img={img2} title ={"Standard"} rupee={"INR 4999.00 Per Year, Per User"} feature = {"up to 5 users"} price={4999}/>
<PlanListCard img={img3} title={"Plus"} rupee={"INR 3999.00 Per Year, Per User"} feature = {"above 10 users"} price={3999}/></div>
    </>
  )
}

export default PlanList