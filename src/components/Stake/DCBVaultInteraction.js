/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import stakeAbi from "../../abi/DCBVault_abi.json"
import bptAbi from "../../abi/Balancer_BPT.json"

// Assuming you have the contract address
const CONTRACT_ADDRESS = '0xff1eB5FFd66a308E46856668617D68d06903804c'; // Replace with your contract address
const BALANCER_BPT_ADDRESS = '0x7120fD744CA7B45517243CE095C568Fd88661c66';

function DCBVaultInteraction() {
  const { address } = useAccount();
  const [pid, setPid] = useState('0');
  const [amount, setAmount] = useState('');

  const { data: writeData, error: writeError, isPending, writeContract } = useWriteContract() 
  const {data: readData, error: readError, read} = useReadContract()

  



  // Read functions
  const { data: balanceOf } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'balanceOf',
    args: [BigInt(pid)],
  });

  const { data: canUnstake } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'canUnstake',
    args: [address, BigInt(pid)],
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

  // Write functions

  const approve = () => {writeContract({
    address: BALANCER_BPT_ADDRESS,
    abi: bptAbi,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, parseEther(amount)]
    
  })
  console.log("approve")
};
  const deposit = () => {writeContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'deposit',
    args: [BigInt(pid), parseEther(amount)]
    
  })
  console.log("deposit")
};

  const withdraw = () => {writeContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'withdraw',
    args: [BigInt(pid), parseEther(amount)],

  })
  console.log("can Unstake", canUnstake)
  console.log("withdraw")
};

  const harvest = () => {writeContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'harvest',
    args: [BigInt(pid)],
  })
  console.log("harvest")
  };

  const zapEtherAndStake = () => {writeContract({
    address: CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'zapEtherAndStakeIMO',
    value: parseEther(amount),
    args: [BigInt(pid)],
  })
  console.log("zap Ether and Stake")
  };

  // Wait for transaction
  const { isLoading: isDepositLoading, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({
    hash: writeData?.hash,
  });

  const { isLoading: isWithdrawLoading, isSuccess: isWithdrawSuccess } = useWaitForTransactionReceipt({
    hash: writeData?.hash,
  });

  const { isLoading: isHarvestLoading, isSuccess: isHarvestSuccess } = useWaitForTransactionReceipt({
    hash: writeData?.hash,
  });

  const handleApprove = () => {
    approve();
  };

  const handleDeposit = () => {
    deposit();
  };

  const handleWithdraw = () => {
    withdraw();
  };

  const handleHarvest = () => {
    harvest();
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
        <button onClick={handleApprove} >
          Approve
        </button>
      </div>

      <div>
        <button onClick={zapEtherAndStake} >
          Zap Ether and Stake
        </button>
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
        <p>BPT Balance: {BPTbalanceOf ? BPTbalanceOf.toString() : '0'}</p>
        <p>Stake Balance: {balanceOf ? balanceOf.toString() : '0'}</p>

        <p>Allowance: {allowance ? allowance.toString() : '0'}</p>
        <p>Can Unstake: {canUnstake !== undefined ? (canUnstake ? 'Yes' : 'No') : 'Loading...'}</p>
      </div>
    </div>
  );
}

export default DCBVaultInteraction;
