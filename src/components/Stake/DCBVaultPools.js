
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract , useWriteContract} from 'wagmi';
import masterchefAbi from "../../abi/DCBMasterChef.json";
import Stake from "./DCBVaultInteraction";
import PoolInfo from './PoolInfos';
import stakeAbi from "../../abi/DCBVault_abi.json"
import {Web3ToastNotification} from '../ErrorDisplay/Web3ToastNotification'
import './DCBVaultPools.css'



const CONTRACT_ADDRESS = '0xFFa471d13DF6e912AE9b18d652bB0C7f972CCa76'; // Replace with your contract address

function DCBVaultPools() {
  const { address } = useAccount();
  const [error, setError] = useState(null);

  const [poolLength, setPoolLength] = useState(0);

  const { data: writeHarvestAllData, error: writeHarvestAllError, isPending: isHarvestAllPending, writeContract: writeHarvestAllContract } = useWriteContract();


  // Read pool length
  const { data: poolLengthData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: masterchefAbi,
    functionName: 'poolLength',
  });

  useEffect(() => {
    const currentError =  writeHarvestAllError;
    if (currentError) {
      setError(currentError);
      console.log(currentError.details || currentError.message);
    } else {
      setError(null);
    }
  }, [writeHarvestAllError]);
  

  useEffect(() => {
    if (poolLengthData) {
      setPoolLength(Number(poolLengthData));
    }
  }, [poolLengthData]);

  const handleError = (err) => {
    console.error(err);
    setError(err);
  };

  const harvestAll = async () => {
    try {
      await writeHarvestAllContract({
        address: CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'harvestAll',
      });
    } catch (err) {
      handleError(err);
    }
  };

  

  

  return (
    <div>
    <div className="dcb-vault-pools">
      <h2>DCB Vault Pools</h2>
      <p>Total Pools: {poolLength}</p>

      <Web3ToastNotification showError={error} errorMessage={error?.details || error?.message || ''} />

      <button 
        className="harvest-all-button"
        onClick={harvestAll} 
        disabled={isHarvestAllPending}
      >
        {isHarvestAllPending ? 'Harvesting All...' : 'Harvest All'}
      </button>
      
      
    </div>

      <ul >
      {[...Array(poolLength)].map((_, index) => (
        <PoolInfo key={index} poolId={index} />
      ))}
      </ul>
</div>
  );
}

export default DCBVaultPools;
