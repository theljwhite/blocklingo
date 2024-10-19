import { expect } from "chai";
import hre from "hardhat";
import { BlocklingoPuzzle, type BlocklingoToken } from "../typechain-types";

let tokenContract: BlocklingoToken;
let tokenAddress: string;

let puzzle: BlocklingoPuzzle;
let puzzleAddress: string;

let deployer: any;
let manager: any;
let userOne: any;

describe("BlocklingoPuzzle", async () => {
  before(async () => {
    const accounts = await hre.ethers.getSigners();

    deployer = accounts[0];
    userOne = accounts[1];

    //deploy BlocklingoToken as deployer account
    tokenContract = await hre.ethers.deployContract("BlocklingoToken");
    tokenAddress = await tokenContract.getAddress();

    puzzle = await hre.ethers.deployContract("BlocklingoPuzzle", [
      tokenAddress,
    ]);
    puzzleAddress = await puzzle.getAddress();

    //approve puzzle contract to transfer tokens on behalf of deployer
    const totalSupply = await tokenContract.totalSupply();
    await tokenContract.connect(deployer).approve(puzzleAddress, totalSupply);
  });

  it("tests deposit reward tokens", async () => {
    const escrowBalanceInitial = await puzzle.escrowBalance();

    expect(escrowBalanceInitial).equal(0, "Incorrect initial balance");

    //deposit 10,000 tokens.
    const amount = hre.ethers.parseUnits("10000", 18);
    await puzzle.connect(deployer).depositEscrow(amount);

    const escrowBalanceAfter = await puzzle.escrowBalance();
    const formattedBalAfter = hre.ethers.formatEther(escrowBalanceAfter);

    expect(formattedBalAfter).equal("10000.0", "Incorrect balance");
  });
  it("tests a win puzzle", async () => {
    //ensure user one wallet bal is 0
    const userOneInitWalletBal = await tokenContract.balanceOf(userOne);
    expect(userOneInitWalletBal).equal(
      0,
      "Incorrect init wallet bal - user one"
    );
    const formattedAmount = hre.ethers.parseUnits("5", 18);

    //win as user one
    await puzzle.connect(userOne).winPuzzle(formattedAmount);

    const userOneFinalBal = await tokenContract.balanceOf(userOne);
    const formattedUserOneBalAfter = hre.ethers.formatEther(userOneFinalBal);

    expect(formattedUserOneBalAfter).equal(
      "5.0",
      "Incorrect user one bal after winning"
    );
  });
});
