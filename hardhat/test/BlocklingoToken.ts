import { expect } from "chai";
import hre from "hardhat";
import { type BlocklingoToken } from "../typechain-types";

let tokenContract: BlocklingoToken;

let deployer: any;
let manager: any;
let userOne: any;

describe("BlocklingoToken", async () => {
  before(async () => {
    const accounts = await hre.ethers.getSigners();

    deployer = accounts[0];
    manager = accounts[10];

    userOne = accounts[1];

    //deploy BlocklingoToken as deployer account
    tokenContract = await hre.ethers.deployContract("BlocklingoToken");
  });

  it("checks deployer account balance for correct balance", async () => {
    const deployerBalance = await tokenContract.balanceOf(deployer.address);
    const totalSupply = await tokenContract.totalSupply();
    expect(deployerBalance).equal(totalSupply, "Incorrect deployer balance");
  });
  it("ensures deployer can transfer tokens", async () => {
    const initialManagerBal = await tokenContract.balanceOf(manager.address);

    expect(initialManagerBal).equal(0, "Initial balance should be 0.");

    //make a transfer from deployer to manager
    const amount = 1_000_000;
    await tokenContract.transfer(manager.address, amount);

    const finalManagerBal = await tokenContract.balanceOf(manager.address);

    expect(finalManagerBal).equal(amount, "Incorrect balance after transfer");
  });
  it("simulates rewarding tokens via manager account (for now)", async () => {
    const initialUserOneBal = await tokenContract.balanceOf(userOne.address);
    const initialDeployerBal = await tokenContract.balanceOf(deployer.address);
    const totalSupply = await tokenContract.totalSupply();

    expect(initialUserOneBal).equal(0, "Initial balance should be 0.");
    expect(initialDeployerBal).equal(
      Number(totalSupply) - 1_000_000,
      "Incorrect, 1 million was transferred earlier"
    );

    //approve manager to spend tokens on behalf of deployer
    const rewardAmount = 100;
    await tokenContract.connect(deployer).approve(manager.address, totalSupply);

    //simulate rewarding a token. manager transfers tokens to user.
    await tokenContract
      .connect(manager)
      .transferFrom(deployer.address, userOne.address, rewardAmount);

    const managerBal = await tokenContract.balanceOf(manager.address);
    const newUserOneBal = await tokenContract.balanceOf(userOne.address);

    expect(managerBal).equal(
      1_000_000,
      "Should still be the same from earlier"
    );
    expect(newUserOneBal).equal(
      rewardAmount,
      "Incorrect user balance. Should be 100."
    );
  });
});
