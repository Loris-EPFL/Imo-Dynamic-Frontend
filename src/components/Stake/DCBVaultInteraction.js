import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract, useBalance, usePublicClient } from 'wagmi';
import { parseEther, parseGwei } from 'viem';
import { base } from 'viem/chains';
import stakeAbi from "../../abi/DCBVault_abi.json"
import bptAbi from "../../abi/Balancer_BPT.json"
import { formatBigIntToDecimal } from './formatBigIntToDecimal';
import {Web3ToastNotification} from '../ErrorDisplay/Web3ToastNotification'
import "./DCBVaultInteraction.css";
import {DCBVAULT_CONTRACT_ADDRESS, BALANCER_BPT_ADDRESS} from "./ContractAdress";
import StakeButtons from './StakeButtons';



function DCBVaultInteraction({ poolId }) {
  //States
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [isZapEther, setIsZapEther] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);



  //Error States
  const [zapError, setZapError] = useState(null);
  const [approveError, setApproveError] = useState(null);
  const [depositError, setDepositError] = useState(null);
  const [withdrawError, setWithdrawError] = useState(null);
  const [harvestError, setHarvestError] = useState(null);
  const [withdrawAllError, setWithdrawAllError] = useState(null);

  //gas hook
  const { data: ethBalance } = useBalance({ address });
  const publicClient = usePublicClient({
    chainId: base.id, 
  });



  //Write Hooks
  const { data: writeZapData, error: writeZapError, isPending: isZapPending, writeContract: writeZapContract } = useWriteContract();
  const { data: writeApproveData, error: writeApproveError, isPending: isApprovePending, writeContract: writeApproveContract } = useWriteContract();
  const { data: writeDepositData, error: writeDepositError, isPending: isDepositPending, writeContract: writeDepositContract } = useWriteContract();
  const { data: writeWithdrawData, error: writeWithdrawError, isPending: isWithdrawPending, writeContract: writeWithdrawContract } = useWriteContract();
  const { data: writeWithdrawAllData, error: writeWithdrawAllError, isPending: isWithdrawAllPending, writeContract: writeWithdrawAllContract } = useWriteContract();
  const { data: writeHarvestData, error: writeHarvestError, isPending: isHarvestPending, writeContract: writeHarvestContract } = useWriteContract();
 
  // Add useWaitForTransactionReceipt hooks for each transaction type
  const { data: ZapData, isLoading: isZapLoading, isSuccess: isZapSuccess } = useWaitForTransactionReceipt({ hash: writeZapData });
  const { data: ApproveData, isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({ hash: writeApproveData });
  const { data: DepositData, isLoading: isDepositLoading, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({ hash: writeDepositData });
  const { data: WithdrawData,isLoading: isWithdrawLoading, isSuccess: isWithdrawSuccess } = useWaitForTransactionReceipt({ hash: writeWithdrawData });
  const { data: HarvestData, isLoading: isHarvestLoading, isSuccess: isHarvestSuccess } = useWaitForTransactionReceipt({ hash: writeHarvestData });
  const { data: WithdrawAllData,isLoading: isWithdrawAllLoading, isSuccess: isWithdrawAllSuccess } = useWaitForTransactionReceipt({ hash: writeWithdrawAllData });

  const bypassApprove = false;


  useEffect(() => {
    if (writeZapError) setZapError(writeZapError);
    if (writeApproveError) setApproveError(writeApproveError);
    if (writeDepositError) setDepositError(writeDepositError);
    if (writeWithdrawError) setWithdrawError(writeWithdrawError);
    if (writeHarvestError) setHarvestError(writeHarvestError);
    if (writeWithdrawAllError) setWithdrawAllError(writeWithdrawAllError);
  }, [writeZapError, writeApproveError, writeDepositError, writeWithdrawError, writeHarvestError, writeWithdrawAllError]);

  //Handle Error Messages
  const handleError = (err, setErrorFunction) => {
    console.error(err);
    setErrorFunction(err);
  };

  //Handle Sucess Messages
  const handleSuccess = (succ, setSucessFonction) => {
    console.error(succ);
    setSucessFonction(succ);
  };

  // Read functions
  const { data: balanceOf } = useReadContract({
    address: DCBVAULT_CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'users',
    args: [poolId, address], 
  });

  const { data: canUnstake } = useReadContract({
    address: DCBVAULT_CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'canUnstake',
    args: [address, poolId],
  });

  const {data: allowance} = useReadContract({
    address: BALANCER_BPT_ADDRESS,
    abi: bptAbi,
    functionName: 'allowance',
    account: address,
    args: [address, DCBVAULT_CONTRACT_ADDRESS]
  });

  const { data: BPTbalanceOf } = useReadContract({
    address: BALANCER_BPT_ADDRESS,
    abi: bptAbi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: ClaimableRewards } = useReadContract({
    address: DCBVAULT_CONTRACT_ADDRESS,
    abi: stakeAbi,
    functionName: 'getRewardOfUser',
    args: [address, poolId],
  });



  const approve = async () => {
    setApproveError(null);

    try {
      await writeApproveContract({
        address: BALANCER_BPT_ADDRESS,
        abi: bptAbi,
        functionName: 'approve',
        args: [DCBVAULT_CONTRACT_ADDRESS, parseEther(amount)]
      });
    } catch (err) {
      handleError(err, setApproveError);
    }
  };

  const deposit = async () => {
    try {
      const result = await writeDepositContract({
        address: DCBVAULT_CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'deposit',
        args: [poolId, parseEther(amount)]
      });
      console.log('Deposit transaction sent:', result);
    } catch (error) {
      console.error('Error in deposit:', error);
      setDepositError(error, setDepositError);
    }
  };

  const withdraw = async () => {
    setWithdrawError(null);
    try {
      await writeWithdrawContract({
        address: DCBVAULT_CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'withdraw',
        args: [poolId, parseEther(amount)]
      });
    } catch (err) {
      handleError(err, setWithdrawError);
    }
  };

  

  const harvest = async () => {
    setHarvestError(null);
    try {
      await writeHarvestContract({
        address: DCBVAULT_CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'harvest',
        args: [poolId]
      });
    } catch (err) {
      handleError(err, setHarvestError);
    }
  };

  

  const zapEtherAndStake = async () => {
    setZapError(null);
    try {
      await writeZapContract({
        address: DCBVAULT_CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'zapEtherAndStakeIMO',
        value: parseEther(amount),
        args: [poolId]
      });

    } catch (err) {
      handleError(err, setZapError);
    }
  };

  const withdrawAll = async () => {
    setWithdrawAllError(null);
    try {
      await writeWithdrawAllContract({
        address: DCBVAULT_CONTRACT_ADDRESS,
        abi: stakeAbi,
        functionName: 'withdrawAll',
        args: [poolId]
      });
    } catch (err) {
      handleError(err, setWithdrawAllError);
    }
  };

  const formatDate = (timestamp) => {
    const time = parseInt(timestamp);
    const date = new Date(Number(time * 1000));
    return date.toLocaleString();
  };

  const setMaxAmount = async () => {
    if(isWithdraw){
      setAmount(formatBigIntToDecimal(balanceOf[2]).toString());
    }else{
  if (isZapEther) {
    if (ethBalance) {
      // Estimate gas for the transaction
      const gasPrice = await publicClient.getGasPrice();
      const gasLimit = 300000n; // You might want to estimate this more accurately
      const gasCost = gasPrice * gasLimit;
      
      // Calculate max amount, leaving some ETH for gas
      const maxAmount = ethBalance.value > gasCost ? ethBalance.value - gasCost : 0n;
      setAmount(formatBigIntToDecimal(maxAmount).toString());
    }
  } else {
    if (BPTbalanceOf) {
      setAmount(formatBigIntToDecimal(BPTbalanceOf).toString());
    }
  }
  }
};


  // ... (rest of your component code, including read functions)

  return (
    <div>
      {/* Error notification */}
      <Web3ToastNotification showToast={!!zapError} toastMessage={zapError?.details || zapError?.message || ''} />
      <Web3ToastNotification showToast={!!approveError} toastMessage={approveError?.details || approveError?.message || ''} />
      <Web3ToastNotification showToast={!!depositError} toastMessage={depositError?.details || depositError?.message || ''} />
      <Web3ToastNotification showToast={!!withdrawError} toastMessage={withdrawError?.details || withdrawError?.message || ''} />
      <Web3ToastNotification showToast={!!harvestError} toastMessage={harvestError?.details || harvestError?.message || ''} />
      <Web3ToastNotification showToast={!!withdrawAllError} toastMessage={withdrawAllError?.details || withdrawAllError?.message || ''} />
       
        {/* Loading notifications */}
      <Web3ToastNotification showToast={!!isZapLoading} toastMessage={'Waiting for Transaction to Confirm ...'} />
      <Web3ToastNotification showToast={!!isApproveLoading} toastMessage={'Waiting for Transaction to Confirm ...'} />
      <Web3ToastNotification showToast={!!isDepositLoading} toastMessage={'Waiting for Transaction to Confirm ...'} />
      <Web3ToastNotification showToast={!!isWithdrawLoading} toastMessage={'Waiting for Transaction to Confirm ...'} />
      <Web3ToastNotification showToast={!!isHarvestLoading} toastMessage={'Waiting for Transaction to Confirm ...'} />
      <Web3ToastNotification showToast={!!isWithdrawAllLoading} toastMessage={'Waiting for Transaction to Confirm ...'} />

      {/* Confirm notifications */}
      <Web3ToastNotification showToast={!!isZapSuccess} toastMessage={`Zap and stake successful! Transaction hash: ${ZapData?.transactionHash}`} />
      <Web3ToastNotification showToast={!!isApproveSuccess} toastMessage={`Approval successful! Transaction hash: ${ApproveData?.transactionHash}`} />
      <Web3ToastNotification showToast={!!isDepositSuccess} toastMessage={`Deposit successful! Transaction hash: ${DepositData?.transactionHash}`} />
      <Web3ToastNotification showToast={!!isWithdrawSuccess} toastMessage={`Withdrawal successful! Transaction hash: ${WithdrawData?.transactionHash}`} />
      <Web3ToastNotification showToast={!!isHarvestSuccess} toastMessage={`Harvest successful! Transaction hash: ${HarvestData?.transactionHash}`} />
      <Web3ToastNotification showToast={!!isWithdrawAllSuccess} toastMessage={`Withdraw all successful! Transaction hash: ${WithdrawAllData?.transactionHash}`} />

      <div className="vault-info">
        <h3>Vault Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Your Shares:</span>
            <span className="info-value">{balanceOf ? (formatBigIntToDecimal(balanceOf[0]).toString()) : '0'} BPT</span>
            <span className="info-label">Last Deposit Time:</span>
            <span className="info-value">{balanceOf ? (formatDate(balanceOf[1])) : '0'}</span>
          
          </div>
          <div className="info-item">
            <span className="info-label">Total Deposited :</span>
            <span className="info-value">{balanceOf ? (formatBigIntToDecimal(balanceOf[2]).toString()) : '0'} BPT</span>
            <span className="info-label">Can Unstake:</span>
            <span className="info-value">{canUnstake !== undefined ? (canUnstake ? 'Yes' : 'No') : 'Loading...'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Claimable Rewards :</span>
            <span className="info-value">{ClaimableRewards ? (formatBigIntToDecimal(ClaimableRewards).toString()) : '0'} IMO</span>
            <span className="info-label">Claimed Rewards :</span>
            <span className="info-value">{balanceOf ? (formatBigIntToDecimal(balanceOf[3]).toString()) : '0'} IMO</span>
          </div>
          <div className="info-item">
            <span className="info-label">Available BPT Balance to Stake:</span>
            <span className="info-value">{BPTbalanceOf ? (formatBigIntToDecimal(BPTbalanceOf).toString()) : 'Loading...'} BPT</span>
          </div>
          <div className="info-item">
            <span className="info-label">Allowance:</span>
            <span className="info-value">{allowance ? (formatBigIntToDecimal(allowance).toString()) : '0'} BPT</span>
          </div>
          
        </div>
      </div>

      
      
      <div className="vault-interaction-wrapper">
        <div className="vault-interaction">
          <h2>DCB Vault Interaction</h2>
          
      
          
          <div>
                

              {!isWithdraw ? <label>Amount to Stake for Pool n° {poolId}</label> : <label>Amount to Withdraw for Pool n° {poolId}</label>}
              <div className="input-with-max">
                <button onClick={setMaxAmount}>Max</button>
                  <input 
                    type="text" 
                    value={amount}  
                    onChange={(e) => {
                      const re = /^[0-9]*\.?[0-9]*$/;
                      if (e.target.value === '' || re.test(e.target.value)) {
                        setAmount(e.target.value);
                      }
                    }} 
                  />
                  
              </div>
              <div className="toggle-container">

              <div className="zap-toggle">
                <label>
                  <input 
                    type="checkbox" 
                    checked={isZapEther} 
                    onChange={(e) => 
                      {if(!isWithdraw){
                        setIsZapEther(e.target.checked)
                      }
                        
                     }
                    } 
                  />
                  <span className="toggle-slider" />
                  
                </label>
                <span>Zap Ether and Stake</span>
                </div>
                
                <div className="zap-toggle">
                <label>
                  <input 
                    type="checkbox" 
                    checked={isWithdraw} 
                    onChange={(e) => {
                      setIsWithdraw(e.target.checked)
                      if(isZapEther){
                        setIsZapEther(!e.target.checked)
                      }
                    }} 
                  />
                  <span className="toggle-slider" />
                  
                </label>
                <span>Withdraw</span>
                </div>
              </div>
            </div>


          <div className="button-container">
            
            {!isWithdraw ? <StakeButtons 
              isZapEther={isZapEther}
              zapEtherAndStake={zapEtherAndStake}
              isZapPending={isZapPending}
              allowance={allowance}
              amount={amount}
              bypassApprove={bypassApprove}
              deposit={deposit}
              isDepositPending={isDepositPending}
              approve={approve}
              isApprovePending={isApprovePending}
            /> : <></>}
            
            {isWithdraw ? <button onClick={withdraw} disabled={isWithdrawPending}>
              {isWithdrawPending ? 'Withdrawing...' : 'Withdraw'}
            </button> : <></>}

           
            
            <button onClick={harvest} disabled={isHarvestPending}>
              {isHarvestPending ? 'Harvesting...' : 'Harvest'}
            </button>

            {isWithdraw ? <button onClick={withdrawAll} disabled={isWithdrawAllPending}>
              {isWithdrawAllPending ? 'Withdrawing All...' : 'Withdraw All'}
            </button> : <></>}

            
          </div>

          {/* ... (rest of your JSX) */}
        </div>
      </div>
    </div>
  );
}

export default DCBVaultInteraction;