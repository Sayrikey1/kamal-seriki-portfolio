import type { Web3Fundamentals } from "@/types/content";

const GH = "https://github.com/Sayrikey1";

/**
 * Deliberately presented as a grouped skills track, not as flagship shipped
 * products — these are Foundry study builds covering on-chain primitives.
 */
export const web3Fundamentals: Web3Fundamentals = {
  title: "Web3 & Smart Contract Fundamentals",
  description:
    "A structured Solidity track working through the primitives that on-chain systems are actually built from — collateralised stablecoins, token standards, verifiable randomness, upgrade proxies and trustless fund flows. Built and tested with Foundry, deployed to testnet. These are study builds rather than shipped products, and they are listed here as evidence of the ground covered.",
  skills: [
    "Solidity",
    "Foundry",
    "Chainlink Price Feeds",
    "ERC-20",
    "ERC-721",
    "Proxy Upgrade Patterns",
    "Sepolia Deployment",
    "Gas Profiling",
  ],
  repos: [
    {
      name: "defi-stablecoins",
      description:
        "Algorithmic, decentralised stablecoin pegged to $1, backed by exogenous WETH/WBTC collateral with Chainlink price feeds.",
      url: `${GH}/defi-stablecoins`,
    },
    {
      name: "smart-contract-lottery-24",
      description:
        "Lottery protocol handling trustless state transitions, deployed to the Sepolia testnet.",
      url: `${GH}/smart-contract-lottery-24`,
    },
    {
      name: "fund-me-24",
      description:
        "Decentralised crowdfunding contract with gas-snapshot tracking across iterations.",
      url: `${GH}/fund-me-24`,
    },
    {
      name: "upgradeable-smart-contract",
      description:
        "Proxy-based upgrade patterns, separating contract logic from persistent storage.",
      url: `${GH}/upgradeable-smart-contract`,
    },
    {
      name: "erc20",
      description: "ERC-20 token implementation written from the standard up.",
      url: `${GH}/erc20`,
    },
    {
      name: "nfts-24",
      description: "ERC-721 minting contracts and on-chain metadata handling.",
      url: `${GH}/nfts-24`,
    },
    {
      name: "Airdrop",
      description:
        "Token airdrop distribution, including scripted zero-knowledge interaction.",
      url: `${GH}/Airdrop`,
    },
    {
      name: "simple-storage-24",
      description: "Foundational storage and state-mutation contract patterns.",
      url: `${GH}/simple-storage-24`,
    },
  ],
};
