import React, { useEffect, useRef } from "react";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import DCBVaultInteraction from '../../components/Stake/DCBVaultInteraction';

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
      </div>
    </main>
  );
}

export default Stake;

