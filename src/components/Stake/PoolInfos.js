/* eslint-disable no-undef */

import React from 'react';
import { useReadContract } from 'wagmi';
import masterchefAbi from "../../abi/DCBMasterChef.json";
import DCBVaultInteraction from './DCBVaultInteraction';
import { formatBigIntToDecimal } from './formatBigIntToDecimal';


const CONTRACT_ADDRESS = '0xFFa471d13DF6e912AE9b18d652bB0C7f972CCa76';

function PoolInfo({ poolId }) {
  const { data: poolInfo } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: masterchefAbi,
    functionName: 'poolInfo',
    args: [BigInt(poolId)],
  });

  if (!poolInfo) return <p>Loading pool {poolId} info...</p>;

  // Convert timestamp to readable date
  const formatDate = (timestamp) => {
    const time = parseInt(timestamp);
    const date = new Date(Number(time * 1000)); // Multiply by 1000 to convert seconds to milliseconds
    return date.toLocaleString(); // This will use the user's locale settings for formatting
  };

  
 

  return (
    <li>
      <h3>Pool {poolId}</h3>
      <p>APY: {poolInfo[0].toString()} %</p>
      <p>Lock Period: {poolInfo[1].toString()} days</p>
      <p>Total Deposited: {formatBigIntToDecimal(poolInfo[2]).toString()} BPT</p>
      <p>Start Date: {formatDate(poolInfo[3])}</p>
      <p>End Date: {formatDate(poolInfo[4])}</p>
      <p>Hard Cap: {formatBigIntToDecimal(poolInfo[5]).toString()}</p>
        <DCBVaultInteraction poolId={poolId}/>
    </li>
  );
}

export default PoolInfo;
