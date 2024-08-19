/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

// Assuming you have the contract address
const CONTRACT_ADDRESS = '0x...'; // Replace with your contract address

function DCBVaultInteraction({ abi }) {
  const { address } = useAccount();
  const [pid, setPid] = useState('0');
  const [amount, setAmount] = useState('');

  // Read functions
  const { data: balanceOf } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'balanceOf',
    args: [BigInt(pid)],
  });

  const { data: canUnstake } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'canUnstake',
    args: [address, BigInt(pid)],
  });

  // Write functions
  const { write: deposit, data: depositData } = useWriteContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'deposit',
  });

  const { write: withdraw, data: withdrawData } = useWriteContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'withdraw',
  });

  const { write: harvest, data: harvestData } = useWriteContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'harvest',
  });

  // Wait for transaction
  const { isLoading: isDepositLoading, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({
    hash: depositData?.hash,
  });

  const { isLoading: isWithdrawLoading, isSuccess: isWithdrawSuccess } = useWaitForTransactionReceipt({
    hash: withdrawData?.hash,
  });

  const { isLoading: isHarvestLoading, isSuccess: isHarvestSuccess } = useWaitForTransactionReceipt({
    hash: harvestData?.hash,
  });

  const handleDeposit = () => {
    deposit({ args: [BigInt(pid), parseEther(amount)] });
  };

  const handleWithdraw = () => {
    withdraw({ args: [BigInt(pid), parseEther(amount)] });
  };

  const handleHarvest = () => {
    harvest({ args: [BigInt(pid)] });
  };

  return (
    <div>
      <h2>DCB Vault Interaction</h2>
      
      <div>
        <label>Pool ID: </label>
        <input type="number" value={pid} onChange={(e) => setPid(e.target.value)} />
      </div>
      
      <div>
        <label>Amount: </label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      
      <div>
        <button onClick={handleDeposit} disabled={isDepositLoading}>
          {isDepositLoading ? 'Depositing...' : 'Deposit'}
        </button>
        {isDepositSuccess && <span>Deposit successful!</span>}
      </div>
      
      <div>
        <button onClick={handleWithdraw} disabled={isWithdrawLoading}>
          {isWithdrawLoading ? 'Withdrawing...' : 'Withdraw'}
        </button>
        {isWithdrawSuccess && <span>Withdraw successful!</span>}
      </div>
      
      <div>
        <button onClick={handleHarvest} disabled={isHarvestLoading}>
          {isHarvestLoading ? 'Harvesting...' : 'Harvest'}
        </button>
        {isHarvestSuccess && <span>Harvest successful!</span>}
      </div>
      
      <div>
        <p>Balance: {balanceOf ? balanceOf.toString() : '0'}</p>
        <p>Can Unstake: {canUnstake !== undefined ? (canUnstake ? 'Yes' : 'No') : 'Loading...'}</p>
      </div>
    </div>
  );
}

export default DCBVaultInteraction;
