
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import masterchefAbi from "../../abi/DCBMasterChef.json";
import Stake from "./DCBVaultInteraction";
import PoolInfo from './PoolInfos';

const CONTRACT_ADDRESS = '0xFFa471d13DF6e912AE9b18d652bB0C7f972CCa76'; // Replace with your contract address

function DCBVaultPools() {
  const { address } = useAccount();
  const [poolLength, setPoolLength] = useState(0);

  // Read pool length
  const { data: poolLengthData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: masterchefAbi,
    functionName: 'poolLength',
  });
  

  useEffect(() => {
    if (poolLengthData) {
      setPoolLength(Number(poolLengthData));
    }
  }, [poolLengthData]);

  

  return (
    <div>
      <h2>DCB Vault Pools</h2>
      <p>Total Pools: {poolLength}</p>
      
      <ul>
        {[...Array(poolLength)].map((_, index) => (
          <PoolInfo key={index} poolId={index} />
        ))}
      </ul>
    </div>
  );
}

export default DCBVaultPools;
