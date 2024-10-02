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
        {isZapPending ? 'Zapping...' : 'Zap Ether'}
      </button>
    );
  }
  console.log('amount' , parseGwei(amount))

  if (parseGwei(amount) === 0n) {
    return (
      <button onClick={deposit} disabled={true}>
        {isDepositPending ? 'Depositing...' : 'Deposit'}
      </button>
    ); // or return an empty JSX element
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
