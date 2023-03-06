import { ethers } from "hardhat";

const main = async () => {
  // what is a  signer?
  const signers = await ethers.getSigners();
  const signer = signers[0];
  console.log(`This signer address being used is ${signer.address}`);

  // every contract needs a factory before being deployed.. but why?
  const myTokenContractFactory = await ethers.getContractFactory(
    "MyERC20Token"
  );
  const myTokenContract = await myTokenContractFactory.deploy();
  const deployTxReceipt = await myTokenContract.deployTransaction.wait();
  console.log(
    `The contract was deployed at the address ${myTokenContract.address} at block ${deployTxReceipt.blockNumber}`
  );
  const contractName = await myTokenContract.name();
  const contractSymbol = await myTokenContract.symbol();
  let totalSupply = await myTokenContract.totalSupply();
  console.log(
    `The contract name is ${contractName} \nThe contract symbol is ${contractSymbol}\nThe total supply is ${totalSupply} decimal units`
  );
  const mintTx = await myTokenContract.mint(signer.address, 10);
  const mintTxReceipt = await mintTx.wait();
  totalSupply = await myTokenContract.totalSupply();
  console.log(
    `The mint transaction was completed in the block ${mintTxReceipt.blockNumber} \n The total supply now is ${totalSupply} `
  );
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
