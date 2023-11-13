import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getBurns } from '../../scripts/burnTokens.mjs'// Import the function from the script
import { ReactComponent as IMOIcon } from "../../Icons/IMOIcon.svg";
import { ReactComponent as MarketIcon } from "../../Icons/MarketIcon.svg";
import { ReactComponent as CirculatingIcon } from "../../Icons/CirculatingIcon.svg";
import { ReactComponent as Burned } from "../../Icons/Burned.svg";
import { Language } from "../../Context";
import { Line } from 'react-chartjs-2';
import useApi from "../../hooks/useApi";

import "./dataScience.css";
import number_format from "../../scripts/util";

const DataScience = () => {
  const { LanguageUse } = useContext(Language);
  const { t } = useTranslation();
  const { api } = useApi();
  const handlerExplore = () => {
    if (LanguageUse === "en") {
      window.open("https://www.coingecko.com/en/coins/imo");
    } else {
      window.open("https://www.coingecko.com/fr/pièces/imo");
    }
  };

  /**** */
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
        {
            label: 'Token Supply Over Time',
            data: [],
            fill: false,
            backgroundColor: '#fdfaf6',
            borderColor: '#fdfaf6',
            pointBackgroundColor: '#fdfaf6',
            pointBorderColor: '#fdfaf6',
            pointHoverBackgroundColor: '#fdfaf6',
            pointHoverBorderColor: '#fdfaf6',
            pointHoverBorderWidth: 5,
            pointHoverRadius: 5,
            pointStyle: 'circle',
            pointRadius: 3,
            pointHitRadius: 10,
            tension: 0.4, // This adds some curvature to the line
            //stepped: true,
        },
    ],
  })

  const [textToolTipPoint, setTextToolTipPoint] = useState([])
  const [urlBscCsan, setUrlBscScan] = useState([])

  useEffect(() => {
      const fetchTransfers = async () => {
          try {
              const data = await getBurns();
              const textTooltipData = 
                  data.map(tx => 
                      {
                          return {
                              line1: `Supply burnt: ${tx.supplyBurnt}`,
                              line2: `Total supply: ${tx.totalSupply}`,
                              line3: `Tx hash: ${tx.hash}`,
                              line4: `Click to see the tx on bcscan.com`,
                          }
                      }
                  ); 
              setTextToolTipPoint(textTooltipData)

              const urlBscScanData = data.map(tx => tx.url_bscscan); 
              setUrlBscScan(urlBscScanData)

              //Try with date like this : 
              //new Date(transfer.timestamp).toLocaleString()
              setChartData(prevState => ({
                  ...prevState,
                  labels: data.map(transfer => transfer.timestamp),
                  datasets: [
                      {
                          ...prevState.datasets[0],
                          data: data.map(transfer => transfer.totalSupply),
                      },
                  ],
              }));
          } catch (error) {
              console.error('Error fetching transfers:', error)
          }
      };

      fetchTransfers()
  }, []);


  //Options to display the chart
  const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              position: 'top',
              labels: {
                  color: '#fdfaf6' // Legend text color
              }
          },
          title: {
              display: true,
              text: 'Token Supply Over Time',
              color: '#fdfaf6' // Title text color
          },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      const index = context.dataIndex
                      const tooltipText = textToolTipPoint[index]
                      return [tooltipText.line1, tooltipText.line2, tooltipText.line3, tooltipText.line4]
                  }
              }
          }
      },
      scales: {
          x: {
              grid: {
                  display: false,
                  drawBorder: false,
              },
              ticks: {
                  color: '#fdfaf6' // X-axis tick color
              }
          },
          y: {
              grid: {
                  color: '#f0f0f0', // Light grey for Y-axis grid lines
              },
              ticks: {
                  color: '#fdfaf6' // X-axis tick color
              }
          },
      },
      layout: {
          padding: {
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
          },
      },
      elements: {
          line: {
              borderWidth: 3, // Thicker line
              borderCapStyle: 'round', // Round caps at the end of the line
          },
          point: {
              borderWidth: 2,
              radius: 4,
              hitRadius: 10,
              hoverRadius: 7,
          }
      },
      backgroundColor: '#f0f0f0', // Light grey background
      onHover: (event, chartElement) => {
          event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      },
      onClick: (event, elements) => {
          if (elements.length > 0) {
              const randomUrl = getUrlBscScan();
              window.open(randomUrl, '_blank');
          }
      },
  }

  const getUrlBscScan = () => {
    // Define a list of random URLs
    const urls = urlBscCsan
    // Return a random URL from the list
    return urls[Math.floor(Math.random() * urls.length)];
  }


  /******* */
  return (
    <div className="dataScience">
      <div className="dataScienceContainer">
        <div className="dataScienceTitle">{t("DataTitle")}</div>
        <div className="dataScienceList">
          <div className="dataScienceItem">
            <IMOIcon className="dataScienceItemIcon" />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">IMO ($IMO)</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && (api.cg.market_data.current_price.usd).toFixed(3)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                <div className="dataScienceItemTextNumberEnd">$US</div>
              </div>
            </div>
          </div>
          <div className="dataScienceItem">
            <MarketIcon />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">{t("Marketcap")}</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && number_format(api.cg.market_data.market_cap.usd)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                <div className="dataScienceItemTextNumberEnd">$US</div>
              </div>
            </div>
          </div>
          <div className="dataScienceItem">
            <CirculatingIcon />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">{t("CIRCULATING")}</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && number_format(api.cg.market_data.circulating_supply)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                {"  /   "}
                <span>
                  {api && number_format(Math.trunc(api.cg.market_data.total_supply))}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
              </div>
            </div>
          </div>
          <div className="dataScienceItem">
            <Burned />
            <div className="dataScienceItemText">
              <div className="dataScienceItemTextTitle">{t("Burntoken")}</div>
              <div className="dataScienceItemTextNumber">
                <span>
                  {api && number_format(api.bsc.burn)}
                  {!api && LanguageUse === "en" && "Loading..."}
                  {!api && LanguageUse === "fr" && "Chargement..."}
                </span>
                <div className="dataScienceItemTextNumberEnd">IMO</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ margin: '10 10 10 10 auto', marginLeft: '200px', marginTop: '50px', maxWidth: '800px', width: '800px', height: '400px', background: 'rgb(29, 32, 45)' }}>
          <Line data={chartData} options={options} />
        </div>

        <div className="dataScienceButton">
          <div className="button" onClick={handlerExplore}>
            {t("Explore")}
          </div>
        </div>
      </div>

      {/* <div className='box' style={{ display: 'flex' }}>
                    <div className='title'>IMO(IMO)</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='price'></span>$US
                         <span imo='price-change-percentage-24h'></span>
                    </div>
                    <div className='title'> Trade volume</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='total-volume'></span>$US
                    </div>
                    <div className='title'> Circulating offer</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='circulating-supply'></span> / <span imo='total-supply'></span>
                    </div>
                    <div className='title'> Jetons brulés</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='burn'></span>
                    </div>
                    <div className='title'> ATH:</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='ath'></span>$US
                    </div>
                    <div className='title'> ATL:</div>
                    <div className='value' style={{ marginRight: 20 }}>
                         <span imo='atl'></span>$US
                    </div>
               </div> */}
    </div>
  );
};

export default DataScience;
