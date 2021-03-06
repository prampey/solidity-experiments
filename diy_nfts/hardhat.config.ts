import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL;
const MNEMONIC = process.env.MNEMONIC || "";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
	solidity: "0.8.4",
	networks: {
		ropsten: {
			url: process.env.ROPSTEN_URL || "",
			accounts:
				process.env.PRIVATE_KEY !== undefined
					? [process.env.PRIVATE_KEY]
					: [],
		},
		// rinkeby: {
		// 	url: RINKEBY_RPC_URL,
		// 	// accounts: [PRIVATE_KEY],
		// 	accounts: {
		// 		mnemonic: MNEMONIC,
		// 	},
		// },
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: "USD",
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
};

export default config;
