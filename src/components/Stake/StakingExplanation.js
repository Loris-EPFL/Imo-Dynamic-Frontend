import React from 'react';
import './StakingExplanation.css';

const StakingExplanation = () => {
  return (
    <div className="explanation-container">
      <h2>What is Staking?</h2>
      <p>
        Staking is the process of locking up your cryptocurrency assets for a certain period of time to support the growth of the token. In return, you receive a reward in the form of interest, paid in IMO tokens.
      </p>

      <h2>Balancer ve8020 Model</h2>
      <p>
        Using Balancer Pool Tokens as the token you stake allows stakers to earn swap fees from the pool while staking, while reducing impermanent loss. Downside protection is assured by the frequent buyback and burn, which generates a price floor for the pool token, while getting additional swap fees yield.
      </p>
      <p>
        We provide an ETH zapper for each pool to allow users to easily stake IMO automatically by converting their ETH to BPT tokens.
      </p>
      <p>
        Alternatively, you can get BPT tokens on <a href="https://balancer.fi/pools/base/v2/0x007bb7a4bfc214df06474e39142288e99540f2b3000200000000000000000191/add-liquidity" target="_blank">Balancer</a>, and stake these BPT tokens in the pool.
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
