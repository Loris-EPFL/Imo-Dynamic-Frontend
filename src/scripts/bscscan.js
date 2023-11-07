import { Contract } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");

class BscScanApi {
  constructor() {
    this.contract = new Contract(
      "0x94d79c325268c898d2902050730f27a478c56cc1",
      [
        "function balanceOf(address account) external view returns (uint256)",
        "function totalSupply() external view returns (uint256)",
      ],
      provider
    );

    this.key = "GNY6X65WD9GSC1962Z6DKNCAVBJJT9GEZC";

    this.addrs = {
      team: "0x93429c133ab2c4a04d5d2feecd22d5da7127b4e2",
      partner: "0xa6f4eebaa28af404dc67af1eda0b719f6d460e4c",
      companies: "0x0df0c8b86b64dfdb4a7bea1e8b5af5cb5da37a31",
      //liquidity: '0xf40780c935070b76f77472ebea2fb9476a315716',
      liquidity: "0xfa44D799bFDF6537a54461859b388b99A75B8FbC",
    };
  }

  get() {
    return new Promise(async (resolve, reject) => {
      const team = await this.balanceOf(this.addrs.team);
      const partner = await this.balanceOf(this.addrs.partner);
      const companies = await this.balanceOf(this.addrs.companies);
      const liquidity = Math.trunc(await this.balanceOf(this.addrs.liquidity));
      const totalSupply = await this.totalSupply();
      const investors = (totalSupply - (team + partner + companies + liquidity)).toFixed(0);
      const burn = Math.trunc(20000000 - totalSupply);
      const circulationSupply = (totalSupply - burn);
      resolve({
        team,
        partner,
        companies,
        liquidity,
        investors,
        burn,
        circulationSupply,
      });
    });
  }

  async balanceOf(account) {
    try {
      const balance = await this.contract.balanceOf(account);
      return balance / 10 ** 18;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async totalSupply() {
    try {
      const total = await this.contract.totalSupply();
      return total / 10 ** 18;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

export default BscScanApi;
