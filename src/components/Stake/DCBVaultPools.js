
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract , useWriteContract, useWaitForTransactionReceipt} from 'wagmi';
import masterchefAbi from "../../abi/DCBMasterChef.json";
import Stake from "./DCBVaultInteraction";
import PoolInfo from './PoolInfos';
import stakeAbi from "../../abi/DCBVault_abi.json"
import {Web3ToastNotification} from '../ErrorDisplay/Web3ToastNotification'
import './DCBVaultPools.css'
import { DCBVAULT_CONTRACT_ADDRESS, DECUBATE_MSC_ADDRESS } from './ContractAdress';



function DCBVaultPools() {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState(null);

  const [poolLength, setPoolLength] = useState(0);

  const { data: writeHarvestAllData, error: writeHarvestAllError, isPending: isHarvestAllPending, writeContract: writeHarvestAllContract } = useWriteContract();
  const { data: SuccessHarvestAllData, isLoading: isHarvestAllLoading, isSuccess: isHarvestAllSuccess } = useWaitForTransactionReceipt({ hash: writeHarvestAllData });



  // Read pool length
  const { data: poolLengthData } = useReadContract({
    address: DECUBATE_MSC_ADDRESS,
    abi: masterchefAbi,
    functionName: 'poolLength',
  });

  useEffect(() => {
    if(writeHarvestAllError) setError(writeHarvestAllError)
    if (poolLengthData) {
      setPoolLength(Number(poolLengthData));
    }
  }, [poolLengthData, writeHarvestAllError]);

  //Handle Error Messages
  const handleError = (err, setError) => {
    console.error(err);
    setError(err);
  };

  const harvestAll = async () => {
    setError(null);

    try {
      await writeHarvestAllContract({
        address: DCBVAULT_CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'harvestAll',
      });
    } catch (err) {
      handleError(err, setError);
    }
  };

  
  if (!isConnected) {
    return (
      <div className="dcb-vault-pools">
        <p>Please connect your wallet to access Staking</p>
      </div>
    );
  }
  

  return (
    <div>
    <div className="dcb-vault-pools">
      <h2>DCB Vault Pools</h2>
      <p>Total Pools: {poolLength}</p>

      <Web3ToastNotification showToast={!!error} toastMessage={error?.details || error?.message || ''} />
      <Web3ToastNotification showToast={!!isHarvestAllLoading} toastMessage={"Waiting for Harvest All to Confirm"} />

      <Web3ToastNotification showToast={!!isHarvestAllSuccess} toastMessage={`Harvest All Sucessful! Transaction hash: ${SuccessHarvestAllData?.transactionHash}`} />

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
