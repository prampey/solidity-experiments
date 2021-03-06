// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	const contractFactory = await ethers.getContractFactory("ClockNFT");
	const contract = await contractFactory.deploy();

	await contract.deployed();
	console.log("Contract deployed to:", contract.address);

  // Init base svg
  const initTxn = await contract.initBaseSvg(['<svg width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">',`</svg>`])

const txn = await contract.mintNFT("");
var receipt = await txn.wait();
console.log("Used this much gas:", receipt.gasUsed.toNumber());

const txn1 = await contract.tokenURI(0)
console.log("NFT:", txn1);

const upTxn = await contract.updateMessage("Updated!", 0);

const txn2 = await contract.tokenURI(0)
console.log("NFT:", txn2);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
