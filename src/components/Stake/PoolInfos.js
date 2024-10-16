/* eslint-disable no-undef */

// PoolInfo.jsx
import React, { useState } from 'react';
import { useReadContract } from 'wagmi';
import masterchefAbi from "../../abi/DCBMasterChef.json";
import DCBVaultInteraction from './DCBVaultInteraction';
import { formatBigIntToDecimal } from './formatBigIntToDecimal';
import './PoolInfos.css';
import { DECUBATE_MSC_ADDRESS } from './ContractAdress';


function PoolInfo({ poolId }) {
  const [showInteraction, setShowInteraction] = useState(false);

  const { data: poolInfo } = useReadContract({
    address: DECUBATE_MSC_ADDRESS,
    abi: masterchefAbi,
    functionName: 'poolInfo',
    args: [BigInt(poolId)],
  });

  if (!poolInfo) return <p>Loading pool {poolId} info...</p>;

  const formatDate = (timestamp) => {
    const time = parseInt(timestamp);
    const date = new Date(Number(time * 1000));
    return date.toLocaleString();
  };

  const toggleInteraction = () => {
    setShowInteraction(!showInteraction);
  };

  return (
    <div>
      <div className="pool-card">
        <h3 className="pool-title">Pool #{poolId}</h3>
        
        <div className="pool-info-container">
          <button className="toggle-interaction" onClick={toggleInteraction}>
            {showInteraction ? 'Close' : 'Stake'}
          </button>
          <p className="pool-info"><strong>APY:</strong> {poolInfo[0].toString()}%</p>
          <p className="pool-info"><strong>Lock Period:</strong> {poolInfo[1].toString()} days</p>
          <p className="pool-info"><strong>Total Deposited:</strong> {formatBigIntToDecimal(poolInfo[2]).toString()} BPT</p>
          <p className="pool-info"><strong>Start Date:</strong> {formatDate(poolInfo[3])}</p>
          <p className="pool-info"><strong>End Date:</strong> {formatDate(poolInfo[4])}</p>
          <p className="pool-info"><strong>Hard Cap:</strong> {formatBigIntToDecimal(poolInfo[5]).toString()}</p>
          
        </div>
      </div>
      
      {showInteraction && <DCBVaultInteraction poolId={poolId}/>}
    </div>
  );
}

export default PoolInfo;