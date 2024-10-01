import React, { useEffect, useRef, useLayoutEffect } from "react";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Animation } from '../../components/Animation/Animation'
import Blockchain from '../../components/Blockchain/Blockchain'
import Company from '../../components/Company/Company'
import DataScience from '../../components/DataScience/DataScience'
import Properties from '../../components/Properties/Properties'
import FirstPropertyDetails from '../../components/PropertiesDetails/FirstPropertyDetails'
import Partners from '../../components/Partners/Partners'
import PieChartClass from '../../components/PieChart/PieChartClass'
import Presentation from '../../components/Presentation/Presentation'
import RealEstate from '../../components/RealEstate/RealEstate'
import Team from '../../components/Team/Team'
import Project from '../../components/Project/Project'
import Roadmap from '../../components/Roadmap/Roadmap'
import DCBVaultPools from "../../components/Stake/DCBVaultPools";
import "./stake.css";

function Stake() {
  
  

  return (
     <main className='main'>
     <div id="animatedElement" >
      <DCBVaultPools />
      <div className="hidden-components">

              <RealEstate />
               <DataScience />
               <Presentation />
               <Partners />
               <Blockchain />
               <Properties />
               {/* <FirstPropertyDetails /> */}
               <Company />
               <Project />
               <PieChartClass />
               <Team />
               <Roadmap />
               <Animation />
          </div>


      </div>
    </main>
  );
}

export default Stake;

