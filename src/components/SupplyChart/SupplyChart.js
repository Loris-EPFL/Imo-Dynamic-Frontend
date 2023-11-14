import React, { useState, useEffect } from "react";
import { getBurns } from '../../scripts/burnTokens.mjs'
import { Line } from 'react-chartjs-2';


const SupplyChart = () => {

   /**** DISPLAY SUPPLY CHART *****/
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
  const [urlBscCsan, setUrlBscScan]             = useState([])
  const [totalSupplyBurnt, setTotalSupplyBurnt] = useState([])

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

              const urlBscScanData = data.map(tx => tx.url_bscscan)
              console.log('URL')
              console.log(urlBscScanData)
              setUrlBscScan(urlBscScanData)

              let sum = data.reduce((accumulator, object) => accumulator + object.supplyBurnt, 0)
              setTotalSupplyBurnt(sum)

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
  }, [])


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
              text: `Total supply burnt : ${totalSupplyBurnt}`,
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
          event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
      },
      onClick: (event, elements) => {
          if (elements.length > 0) {
            const firstPoint = elements[0]
            const index = firstPoint.index
            const url = urlBscCsan[index]
            if (url) {
                window.open(url, '_blank')
            }
          }
      },
  }

  /**** END USE EFFECT TO DISPLAY SUPPLY CHART *****/
   

  return (
    <div style={{ margin: '10 10 10 10 auto', marginLeft: '200px', marginTop: '50px', maxWidth: '800px', width: '800px', height: '400px', background: 'rgb(29, 32, 45)' }}>
        <Line data={chartData} options={options} />
    </div>

  )
}

export default SupplyChart