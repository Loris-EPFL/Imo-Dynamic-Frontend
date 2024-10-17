import React from "react";
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
import { useQuery, useQueryClient } from 'wagmi';
import { chain } from 'wagmi';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import { IMO_TOKEN_ADDRESS_BASE } from '../../components/Stake/ContractAdress';
import IMO_LZERC20 from '../../abi/IMO_LZERC20.json';
import './Token.css';
import { formatBigIntToDecimal } from "../../components/Stake/formatBigIntToDecimal";


function Token() {
  const { data: accountData } = useAccount();
  const { data: totalSupplyData } = useReadContract({
    address: IMO_TOKEN_ADDRESS_BASE,
    abi: IMO_LZERC20,
    functionName: 'totalSupply',
  });



  return (
    <main className='main' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', marginTop: '100px' }}>
      <div className="token-presentation" style={{ textAlign: 'center' }}>
        <div className="token-info">
          <div className="deployment-details">
          <h2>$IMO</h2>
              <div className="chain-logos">
              <img src="/favicon.ico" alt="IMO Token Logo" />
              </div>
            </div>
          <div className="deployment-info">
            <p>Deployed on:</p>
            <div className="deployment-details">
              <h2>Base</h2>
              <div className="chain-logos">
                <img src="/base_logo.png" alt="Base Logo" />
              </div>
            </div>
          </div>
          <div className="supply-info">
            <h3>Supplies</h3>
            <p>Initial Total Supply: 20,000,000 $IMO</p>
            {totalSupplyData && 
            <div>
            <p>Current Supply: {formatBigIntToDecimal(totalSupplyData).toString() ?? 'Loading...'}  $IMO</p>
            <p>Total Burned: {formatBigIntToDecimal(window.BigInt(20000000*1e18) - totalSupplyData).toString() ?? 'Loading...'}  $IMO</p>
            </div>
            }
          </div>
        </div>

        <div className="chart-container" style={{ width: '80vw', height: '80vh' }}>
          <div id="dexscreener-embed" style={{ width: '100%', height: '100%' }}>
            <iframe src="https://dexscreener.com/base/0x007bb7a4bfc214df06474e39142288e99540f2b3?embed=1&theme=dark" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
          </div>
        </div>
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

export default Token;
