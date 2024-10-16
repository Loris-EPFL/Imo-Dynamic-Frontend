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


function Token() {
  return (
    <main className='main' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="token-presentation" style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Token Presentation</h1>
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
