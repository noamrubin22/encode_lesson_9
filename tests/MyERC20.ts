import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Basic tests for understanding ERC20", async () => {
  let myTokenContract: Contract;
  let signers: SignerWithAddress[] | { address: any }[];

  beforeEach(async () => {
    signers = await ethers.getSigners();
    const myTokenContractFactory = await ethers.getContractFactory("MyERC20");
    myTokenContract = await myTokenContractFactory.deploy();
    await myTokenContract.deployTransaction.wait();

    const mintTx = await myTokenContract.mint(signers[0].address, 1000);
    await mintTx.wait();
  });

  it("should have zero total supply at deployment", async () => {
    const totalSupply = await myTokenContract.totalSupply();
    expect(totalSupply).to.eq(0);
  });

  it("triggers the Transfer event with the address of the sender when sending transactions", async () => {
    await expect(myTokenContract.transfer(signers[1].address, 10))
      .to.emit(myTokenContract, "Transfer")
      .withArgs(signers[0].address, signers[1].address, 10);
  });
});
