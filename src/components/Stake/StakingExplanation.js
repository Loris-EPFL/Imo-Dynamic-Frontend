import React from 'react';
import './StakingExplanation.css';

const StakingExplanation = () => {
  return (
    <div className="explanation-container">
      <h2>What is Staking?</h2>
      <p>
        Staking is the process of locking up your cryptocurrency assets for a certain period of time to support the operation of a blockchain network. In return, you receive a reward in the form of interest, paid in IMO tokens.
      </p>

      <h2>Balancer ve8020 Model</h2>
      <p>
        Using Balancer Pool Tokens allows stakers to earn swap fees from the pool while staking, while reducing impermanent loss. Downside protection is assured by the frequent buyback and burn, which generates a price floor for the pool token, while getting additional swap fees yield.
      </p>


      <h2>Pool Details</h2>
      <p>
        Each pool has the following characteristics:
      </p>
      <ul>
      <li>
          <strong>Start Date:</strong> The date when the pool opens for staking.
        </li>
        <li>
          <strong>End Date:</strong> The date when the pool closes for staking.
        </li>
        <li>
          <strong>Hardcap:</strong> The maximum amount of BPT tokens that can be staked in the pool.
        </li>
        <li>
          <strong>Fixed APY:</strong> The annual percentage yield that you can expect to earn from staking in the pool.
        </li>
        <li>
          <strong>Lock Duration:</strong> Amount of time that your tokens are locked up for staking. During this time, you will not be able to withdraw your tokens.
        </li>
      </ul>
    </div>
  );
};

export default StakingExplanation;
