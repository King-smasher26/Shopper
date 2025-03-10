import React, { useContext, useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import Item from "../Components/Items/Item";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import Newsletter from "../Components/Newsletter/Newsletter";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";// Adjust the path as needed
import DemoCredentials from "./DemoCredentials";

const Shop = (props) => {
  console.log('props at shop', props.mode);
  console.log("mode at shop is", props.mode);
  
  const { updateProfileData } = useContext(ShopContext);
  
  // Make sure axios is configured properly
  axios.defaults.withCredentials = true;
  
  // Fetch profile data and update the context
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`);
        console.log("Profile data fetched in Shop component:", response.data);
        // Update the profile data in the context
        updateProfileData(response.data);
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    
    fetchProfileData();
  }, []); // Empty dependency array means this runs once when component mounts

  const gitRepoUrl = "https://github.com/King-smasher26/Shopper";
  return (
    <>
      <DemoCredentials gitRepoUrl={gitRepoUrl} />
      <Hero />
      <Item mode={props.mode} />
      <Popular mode={props.mode} />
      <Offers />
      <NewCollections mode={props.mode} />
      <Newsletter />
    </>
  );
};

export default Shop;