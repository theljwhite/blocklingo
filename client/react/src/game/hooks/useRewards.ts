import { useRewardsStore } from "../store/rewards-store";
import { useAccount } from "wagmi";
import { useDialogModalStore } from "../store/modal-store";
import { useGameAudio } from "../store/AudioContext";
import { extraEstimatedGas } from "../../helpers/eth-utils";
import BlocklingoPuzzle from "../../configs/contracts/BlocklingoPuzzle.json";
import {
  getBalance,
  writeContract,
  simulateContract,
  signMessage,
  verifyMessage,
} from "wagmi/actions";
import { wagmiConfig } from "../../configs/wagmi";
import { formatUnits, parseUnits, parseGwei } from "viem";
import { type GetBalanceReturnType } from "@wagmi/core";
import { toastError } from "../../components/UI/Toast/Toast";

//TODO - this is for demo purposes and process would be secured and rewards,
//would be managed in a different way (stored in a separate smart contract),
//and then withdrew by user later.

export default function useRewards() {
  const { userBalance, setUserBalance, setBalanceLoading, setTransactionHash } =
    useRewardsStore((state) => state);
  const { isConnected, address: userAddress } = useAccount();

  const { setModal, reset: resetModal } = useDialogModalStore((state) => state);
  const { play: playSound } = useGameAudio();

  const getUserBalance = async (): Promise<GetBalanceReturnType | null> => {
    if (!isConnected || !userAddress) return null;

    const result = await getBalance(wagmiConfig, {
      address: userAddress,
      token: import.meta.env.VITE_ERC20_TOKEN_ADDRESS,
      chainId: 80002,
      unit: "ether",
    });

    return result;
  };

  const getAndSetUserBalance =
    async (): Promise<GetBalanceReturnType | null> => {
      setBalanceLoading(true);
      const result = await getUserBalance();

      if (!result) {
        setBalanceLoading(false);
        return null;
      }

      const formattedBalance = formatUnits(result.value, result.decimals);

      setUserBalance({ value: result.value, formatted: formattedBalance });
      setBalanceLoading(false);

      return result;
    };

  const rewardUser = async (amount: number): Promise<void> => {
    try {
      if (!isConnected || !userAddress) {
        toastError("User wallet not connected.");
        return;
      }

      const rewardTokenDecimals = Number(import.meta.env.VITE_ERC20_DECIMALS);
      const amountInWei = parseUnits(amount.toString(), rewardTokenDecimals);

      rewardModalLoading(
        "Follow the prompts in your wallet to claim your rewards."
      );

      const isValidSignature = await isSignatureVerified();

      if (!isValidSignature) {
        toastError("Signature verification failed.");
        return;
      }

      rewardModalLoading(
        "Thanks for signing! Awaiting wallet transaction confirmation..."
      );

      const writeParams = {
        abi: BlocklingoPuzzle.abi,
        address: import.meta.env.VITE_GAME_SMART_CONTRACT_ADDRESS,
        functionName: "winPuzzle",
        args: [amountInWei],
      };

      const gasWithExtra = await extraEstimatedGas(
        writeParams,
        import.meta.env.VITE_GAME_SMART_CONTRACT_ADDRESS,
        BigInt(120)
      );

      const { request } = await simulateContract(wagmiConfig, {
        ...writeParams,
        gas: gasWithExtra ?? 50_000n,
        gasPrice: parseGwei("30"),
      });

      const txHash = await writeContract(wagmiConfig, request);

      if (!txHash) throw new Error();

      rewardModalLoading(
        "Processing your transaction. For the moment, please remain idle."
      );

      const updatedFormattedBalance = Number(userBalance.formatted) + amount;

      setUserBalance({
        ...userBalance,
        formatted: updatedFormattedBalance.toFixed(2),
      });
      setTransactionHash(txHash);

      resetModal();

      setTimeout(() => {
        rewardModalSuccess(txHash);
      }, 1000);
    } catch (error) {
      console.error("Error signing or processing tx -->", error);
      setTimeout(() => {
        rewardModalError();
      }, 1000);
    }
  };

  const isSignatureVerified = async (): Promise<boolean> => {
    const message = `${
      import.meta.env.VITE_PROJECT_NAME
    } wants you to sign a message to verify the authenticity of your request.`;

    const signResult = await signMessage(wagmiConfig, {
      account: userAddress,
      message,
    });

    const isValid = await verifyMessage(wagmiConfig, {
      address: userAddress ?? "0x",
      message,
      signature: signResult,
    });

    return isValid;
  };

  const rewardModalLoading = (message: string): void => {
    setModal({
      type: "Loading",
      title: "Claiming rewards",
      message,
      isOpen: true,
      isLoading: true,
      outLink: "",
    });
  };

  const rewardModalSuccess = (txHash: string): void => {
    playSound("cash");
    setModal({
      type: "Success",
      title: "Success",
      message: "Congratulations, you claimed your rewards!",
      isOpen: true,
      isLoading: false,
      outLink: `https://amoy.polygonscan.com/tx/${txHash}`,
      outLinkTitle: "See transaction",
    });
  };

  const rewardModalError = (): void => {
    playSound("error_short");
    setModal({
      type: "Error",
      title: "Error processing transaction",
      message:
        "An external error occured when processing the transaction. No worries! You can try your withdraw again at any time.",
      isOpen: true,
      isLoading: false,
    });
  };

  return {
    getUserBalance,
    getAndSetUserBalance,
    rewardUser,
  };
}
