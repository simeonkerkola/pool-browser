import { ref, onMounted, onUnmounted } from 'vue';
import { ethers, BigNumber } from 'ethers';
import { Vault__factory } from '@balancer-labs/typechain';

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/' + import.meta.env.VITE_APP_INFURA_API_KEY
);

// Vault contract address
const address = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
const vault = Vault__factory.connect(address, provider);

export default function useVault() {
  return vault;
}
