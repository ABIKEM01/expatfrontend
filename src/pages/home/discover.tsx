import React, { useEffect, useState } from "react";

import HomeLayout from "../../components/layout/HomeLayout.tsx";
import ProfileCard from "../../components/cards/ProfileCard.js";
import { getUsersAction } from "../../redux/Features/user/getUsersSlice.ts";
import { useDispatch, useSelector } from "react-redux";

function Discover() {
  return (
    <HomeLayout>
      {/* <Hero /> */}

      <div className="px:5 md:px-20 ">
        <h3 className="font-bold py-1 text-xl ">Filter</h3>

        <div className="">
        
          <ProfileCard />
          
        </div>
      </div>
    </HomeLayout>
  );
}

export default Discover;
