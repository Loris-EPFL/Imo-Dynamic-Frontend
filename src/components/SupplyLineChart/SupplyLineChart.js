import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getBurns } from '../../scripts/burnTokens.mjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const SupplyLineChart = () => {

  const [supplyBurnt, setSupplyBurnt] = useState([]);
  const [burns, setBurns] = useState([]);

  useEffect(() => {
    const fetchBurns = async () => {
        try {
          
          const data = await getBurns();
          const supplyBurnt = data
            .map((objBurn)=> {
              return objBurn.value
            })
          console.log('BURNS : ' + supplyBurnt)
          setSupplyBurnt(supplyBurnt);
        } catch (error) {
            console.error('Error fetching transfers:', error);
        }
    };

    fetchBurns();

  }, []);

  
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales for 2023 (in millions)',
        data: [3, 2, 2, 1, 5, 4],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Data',
      },
    },
  };

  return (
    <div style={{ width: '600px', margin: 'auto' }}> {/* You can set a specific pixel width or a percentage */}
      <Line options={options} data={data} />
    </div>
  );
};

export default SupplyLineChart;
