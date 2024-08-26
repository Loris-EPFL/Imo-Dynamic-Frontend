import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parseEther, parseGwei } from 'viem';
import stakeAbi from "../../abi/DCBVault_abi.json"
import bptAbi from "../../abi/Balancer_BPT.json"
import { formatBigIntToDecimal } from './formatBigIntToDecimal';
import {Web3ToastNotification} from '../ErrorDisplay/Web3ToastNotification'
import "./DCBVaultInteraction.css";
const CONTRACT_ADDRESS = '0xff1eB5FFd66a308E46856668617D68d06903804c';
const BALANCER_BPT_ADDRESS = '0x7120fD744CA7B45517243CE095C568Fd88661c66';

function DCBVaultInteraction({ poolId }) {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const { data: writeZapData, error: writeZapError, isPending: isZapPending, writeContract: writeZapContract } = useWriteContract();
  const { data: writeApproveData, error: writeApproveError, isPending: isApprovePending, writeContract: writeApproveContract } = useWriteContract();
  const { data: writeDepositData, error: writeDepositError, isPending: isDepositPending, writeContract: writeDepositContract } = useWriteContract();
  const { data: writeWithdrawData, error: writeWithdrawError, isPending: isWithdrawPending, writeContract: writeWithdrawContract } = useWriteContract();

  const { data: writeHarvestData, error: writeHarvestError, isPending: isHarvestPending, writeContract: writeHarvestContract } = useWriteContract();
 

  const bypassApprove = false;


  useEffect(() => {
    const currentError = writeZapError || writeApproveError || writeDepositError || writeWithdrawError || writeHarvestError;
    if (currentError) {
      setError(currentError);
      console.log(currentError.details || currentError.message);
    } else {
      setError(null);
    }
  }, [writeZapError, writeApproveError, writeDepositError, writeWithdrawError, writeHarvestError]);

  const handleError = (err) => {
    console.error(err);
    setError(err);
  };

  // Read functions
  const { data: balanceOf } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'balanceOf',
    args: [poolId],
  });

  const { data: canUnstake } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'canUnstake',
    args: [address, poolId],
  });

  const {data: allowance} = useReadContract({
    address: BALANCER_BPT_ADDRESS,
    abi: bptAbi,
    functionName: 'allowance',
    account: address,
    args: [address, CONTRACT_ADDRESS]
  });

  const { data: BPTbalanceOf } = useReadContract({
    address: BALANCER_BPT_ADDRESS,
    abi: bptAbi,
    functionName: 'balanceOf',
    args: [address],
  });


  const approve = async () => {
    try {
      await writeApproveContract({
        address: BALANCER_BPT_ADDRESS,
        abi: bptAbi,
        functionName: 'approve',
        args: [CONTRACT_ADDRESS, parseEther(amount)]
      });
    } catch (err) {
      handleError(err);
    }
  };

  const deposit = async () => {
    try {
      await writeDepositContract({
        address: CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'deposit',
        args: [poolId, parseEther(amount)]
      });
    } catch (err) {
      handleError(err);
    }
  };

  const withdraw = async () => {
    try {
      await writeWithdrawContract({
        address: CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'withdraw',
        args: [poolId, parseEther(amount)]
      });
    } catch (err) {
      handleError(err);
    }
  };

  

  const harvest = async () => {
    try {
      await writeHarvestContract({
        address: CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'harvest',
        args: [poolId]
      });
    } catch (err) {
      handleError(err);
    }
  };

  

  const zapEtherAndStake = async () => {
    try {
      await writeZapContract({
        address: CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'zapEtherAndStakeIMO',
        value: parseEther(amount),
        args: [poolId]
      });
    } catch (err) {
      handleError(err);
    }
  };

  // ... (rest of your component code, including read functions)

  return (
    <div>
      <Web3ToastNotification showError={!!error} errorMessage={error?.details || error?.message || ''} />
      <div className="vault-interaction-wrapper">
        <div className="vault-interaction">
          <h2>DCB Vault Interaction</h2>
          
          <div>
            <label>Pool ID: {poolId}</label>
          </div>
          
          <div>
            <label>Amount to Stake: </label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="button-container">
            <button onClick={zapEtherAndStake} disabled={isZapPending}>
              {isZapPending ? 'Zapping...' : 'Zap Ether and Stake'}
            </button>
            
            {allowance >= parseGwei(amount) || bypassApprove ? 
              <button onClick={deposit} disabled={isDepositPending}>
                {isDepositPending ? 'Depositing...' : 'Deposit'}
              </button>
              :
              <button onClick={approve} disabled={isApprovePending}>
                {isApprovePending ? 'Approving...' : 'Approve'}
              </button>
            }
            
            <button onClick={withdraw} disabled={isWithdrawPending}>
              {isWithdrawPending ? 'Withdrawing...' : 'Withdraw'}
            </button>

           
            
            <button onClick={harvest} disabled={isHarvestPending}>
              {isHarvestPending ? 'Harvesting...' : 'Harvest'}
            </button>

            
          </div>

          {/* ... (rest of your JSX) */}
        </div>
      </div>
    </div>
  );
}

export default DCBVaultInteraction;