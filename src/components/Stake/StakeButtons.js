import React from 'react';
import { parseGwei } from 'viem';

function StakeButtons({ 
  isZapEther, 
  zapEtherAndStake, 
  isZapPending, 
  allowance, 
  amount, 
  bypassApprove, 
  deposit, 
  isDepositPending, 
  approve, 
  isApprovePending 
}) {
  if (isZapEther) {
    return (
      <button onClick={zapEtherAndStake} disabled={isZapPending}>
        {isZapPending ? 'Zapping...' : 'Zap Ether and Stake'}
      </button>
    );
  }

  if (allowance >= parseGwei(amount) || bypassApprove) {
    return (
      <button onClick={deposit} disabled={isDepositPending}>
        {isDepositPending ? 'Depositing...' : 'Deposit'}
      </button>
    );
  }

  return (
    <button onClick={approve} disabled={isApprovePending}>
      {isApprovePending ? 'Approving...' : 'Approve'}
    </button>
  );
}

export default StakeButtons;
