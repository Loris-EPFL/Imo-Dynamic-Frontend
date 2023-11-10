import React from 'react'
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
import { Animation } from '../../components/Animation/Animation'
import SupplyLineChart from '../../components/SupplyLineChart/SupplyLineChart'

import './main.css'

const Main = () => {
     return (
          <main className='main'>
               <RealEstate />
               <DataScience />
               <SupplyLineChart />
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
          </main>
     )
}

export default Main
