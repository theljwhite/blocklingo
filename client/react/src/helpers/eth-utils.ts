import { wagmiConfig } from "../configs/wagmi";
import { encodeFunctionData } from "viem";
import { estimateGas } from "wagmi/actions";

export const shortenEthereumAddress = (
  address: string,
  startSlice: number,
  endSlice: number
) => {
  const front = address.slice(0, startSlice);
  const mid = "...";
  const end = address.slice(-endSlice);
  const shortenedAddress = front + mid + end;
  return shortenedAddress;
};

export default shortenEthereumAddress;

export const extraEstimatedGas = async (
  params: any, //TODO sb WriteContractParameters
  toAddress: `0x${string}`,
  percentageExtra: bigint
): Promise<bigint | null> => {
  const encodedParams = encodeFunctionData(params);
  const estimatedGas = await estimateGas(wagmiConfig, {
    data: encodedParams,
    to: toAddress ?? "0x",
  });

  const estimatedWithExtra = estimatedGas
    ? (estimatedGas * percentageExtra) / BigInt(100)
    : null;

  return estimatedWithExtra;
};
