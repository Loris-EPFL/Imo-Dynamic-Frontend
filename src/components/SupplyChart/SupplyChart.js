import React, { useState, useEffect, useContext } from "react";
import { getBurns } from '../../scripts/burnTokens.mjs'
import { Line } from 'react-chartjs-2';
import { Language } from '../../Context'
import { useTranslation } from 'react-i18next'

const SupplyChart = () => {

    const { LanguageUse } = useContext(Language)
    const { t } = useTranslation()

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
                borderWidth: 0.5,
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
                lineTension: 0.1,
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
                console.log('Language : ' + LanguageUse)
                const line1 = 'Burntoken'
                const line2 = 'TotalSupply'
                const line3 = 'TxHash'
                const line4 = 'ClickToSeeTxHash'
                const textTooltipData = 
                    data.map(tx => 
                        {
                            return {
                                line1: `${line1}: ${tx.supplyBurnt}`,
                                line2: `${line2}: ${tx.totalSupply}`,
                                line3: `${line3}: ${tx.hash}`,
                                line4: `${line4}`,
                            }
                        }
                    ); 
                setTextToolTipPoint(textTooltipData)

                const urlBscScanData = data.map(tx => tx.url_bscscan)
                console.log('URL')
                console.log(urlBscScanData)
                setUrlBscScan(urlBscScanData)

                //Total supply IMO burnt
                let sumImo = data.reduce((accumulator, object) => accumulator + object.supplyBurnt, 0)
                let sumImoValue = parseFloat(sumImo); 
                let imoSupplyValue = Math.trunc(sumImoValue); // Truncate decimal part

                // Format with space as the thousand separator like US format
                let formattedTotalSupply = imoSupplyValue.toLocaleString('en-US', { maximumFractionDigits: 0 }).replace(/,/g, ' ');
                setTotalSupplyBurnt(formattedTotalSupply)
                
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


    //Translate tooltip text when hover a point in the Supply Chart
    const textToolTipPointTranslated = textToolTipPoint.map((obj) => {
        return {
            'line1': obj.line1.replace('Burntoken', t('Burntoken')),
            'line2': obj.line2.replace('TotalSupply', t('TotalSupply')),
            'line3': obj.line3.replace('TxHash', t('TxHash')),
            'line4': obj.line4.replace('ClickToSeeTxHash', t('ClickToSeeTxHash')),
        }
    })
    
    //Options to display the chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: [`${t('TotalSupplyOverTime').toUpperCase()}`, '', `${t('TotalIMOBurnt')} : ${totalSupplyBurnt}`],
                color: '#fdfaf6' // Title text color
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const index = context.dataIndex
                        const tooltipText = textToolTipPointTranslated[index]
                        return [tooltipText.line1, tooltipText.line2, tooltipText.line3, tooltipText.line4]
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'DATE',
                    font: {
                        weight: 'extrabold' // Adjust the font weight here
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#f0f0f0', // X-axis tick color
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'IMO',
                    font: {
                        weight: 'bold' // Adjust the font weight here
                    }
                },
                grid: {
                    color: '#f0f0f0', // Light grey for Y-axis grid lines
                    borderWidth: 0
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
   
    // console.log(chartData)
    // console.log(options)
    return (
        <div style={
            { 
                margin: 'auto', 
                maxWidth: '800px', 
                width: '800px', 
                height: '400px', 
                background: 'rgb(29, 32, 45)',
                border: '1px solid black', 
                borderRadius: '15px'
            }}>
            <Line data={chartData} options={options} />
        </div>
    )
}

export default SupplyChart