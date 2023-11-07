import React, { } from "react";

import Navbar from '../../components/Navbar/navbar';
import FirstPropertyDetails from '../../components/PropertiesDetails/FirstPropertyDetails';
import Footer from '../../components/footer/Footer';;

function FirstPropertyDetailsPage() {
     return (
          <>
               <Navbar />
               <FirstPropertyDetails />
               <Footer />
          </>
     );
}

export default FirstPropertyDetailsPage;




// const FirstPropertyPage = () => {
//      return (
//           <main className='main'>
//                <FirstPropertyDetails />
//           </main>
//      )
// };

// export default FirstPropertyPage;
