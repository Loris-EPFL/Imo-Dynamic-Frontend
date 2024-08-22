import React, { useEffect, useRef } from "react";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import DCBVaultInteraction from '../../components/Stake/DCBVaultInteraction';
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


function Stake() {
  const elementRef = useRef(null);

  useEffect(() => {
    const scrollRotate = () => {
      if (elementRef.current) {
        const element = elementRef.current;
        element.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        // You can adjust the '0.5' value to control the speed of the animation
      }
    };

    window.addEventListener('scroll', scrollRotate);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('scroll', scrollRotate);
  }, []);

  return (
     <main className='main'>
     <div id="animatedElement">
        <DCBVaultInteraction />
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
      </div>
    </main>
  );
}

export default Stake;

