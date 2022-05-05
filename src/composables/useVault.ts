import { ref, onMounted, onUnmounted } from 'vue';
import { ethers } from 'ethers';
import VaultAbi from '../constants/VaultAbi.json';

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/' + import.meta.env.VITE_APP_INFURA_API_KEY
);

const address = '0xBA12222222228d8Ba445958a75a0704d566BF2C8'; // DAI contract address
const contract = new ethers.Contract(address, VaultAbi, provider);
console.log({ contract });

export default function useVault() {
  async function getPoolTokens(poolId) {
    console.log({ poolId });
    const res = await contract.getPoolTokens(poolId).catch((err) => {
      throw new Error(err);
    });
    console.log({ res });
    return res;
  }

  return { contract, getPoolTokens };
}
