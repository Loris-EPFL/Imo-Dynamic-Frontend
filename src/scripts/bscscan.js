import { createPublicClient, http, parseAbi, formatUnits } from 'viem';
import { bsc } from 'viem/chains';

class BscScanApi {
  constructor() {
    this.client = createPublicClient({
      chain: bsc,
      transport: http('https://bsc-dataseed.binance.org/')
    });

    this.contractAddress = '0x94d79c325268c898d2902050730f27a478c56cc1';
    this.abi = parseAbi([
      'function balanceOf(address account) external view returns (uint256)',
      'function totalSupply() external view returns (uint256)',
    ]);

    this.key = 'GNY6X65WD9GSC1962Z6DKNCAVBJJT9GEZC';

    this.addrs = {
      team: '0x93429c133ab2c4a04d5d2feecd22d5da7127b4e2',
      partner: '0xa6f4eebaa28af404dc67af1eda0b719f6d460e4c',
      companies: '0x0df0c8b86b64dfdb4a7bea1e8b5af5cb5da37a31',
      liquidity: '0xfa44D799bFDF6537a54461859b388b99A75B8FbC',
    };
  }

  async get() {
    try {
      const [team, partner, companies, liquidity, totalSupply] = await Promise.all([
        this.balanceOf(this.addrs.team),
        this.balanceOf(this.addrs.partner),
        this.balanceOf(this.addrs.companies),
        this.balanceOf(this.addrs.liquidity),
        this.totalSupply(),
      ]);

      const investors = Number(totalSupply) - (team + partner + companies + liquidity);
      const burn = Math.trunc(20000000 - Number(totalSupply));
      const circulationSupply = Number(totalSupply) - burn;

      return {
        team,
        partner,
        companies,
        liquidity: Math.trunc(liquidity),
        investors: investors.toFixed(0),
        burn,
        circulationSupply,
      };
    } catch (e) {
      console.error('Error in get method:', e);
      throw e;
    }
  }

  async balanceOf(account) {
    try {
      const balance = await this.client.readContract({
        address: this.contractAddress,
        abi: this.abi,
        functionName: 'balanceOf',
        args: [account],
      });
      return Number(formatUnits(balance, 18));
    } catch (e) {
      console.error('Error in balanceOf method:', e);
      throw e;
    }
  }

  async totalSupply() {
    try {
      const total = await this.client.readContract({
        address: this.contractAddress,
        abi: this.abi,
        functionName: 'totalSupply',
      });
      return Number(formatUnits(total, 18));
    } catch (e) {
      console.error('Error in totalSupply method:', e);
      throw e;
    }
  }
}

export default BscScanApi;