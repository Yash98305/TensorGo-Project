import React, { useEffect, useState } from "react";
import PlanListCard from "../../Layout/PlanListCard";
import img1 from "../../Layout/basic.png";
import img2 from "../../Layout/business.png";
import img3 from "../../Layout/pro.png";
import { useAuth } from "../../context/auth";
import axios from "axios";

const PlanList = () => {
  const img = [img1, img2, img3];
  const randomIndex = Math.floor(Math.random() * img.length);
  const [data, setData] = useState([]);
  const { auth, api ,servicesId} = useAuth();

  const getPlanData = async () => {
    try {
      const res = await axios.get(`${api}/plan/get-all`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setData(res.data.plans);
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
    }
  };

  useEffect(() => {
    getPlanData();
  }, [auth, api]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "88vh",
        padding: "50px",
      }}
    >
      {data.length > 0 && data.map((plan) => (
        <PlanListCard
          key={plan._id}
          img={img[Math.floor(Math.random() * img.length)]}
          plan={plan}servicesId={servicesId}
         
        />
      ))}
    </div>
  );
};

export default PlanList;
