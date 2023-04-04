import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Container, Text, Box, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import abiFile from "./../contracts/abiFile.json";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const CONTRACT_ADDRESS = "0xaa3906f986e0cd86e64c1e30ce500c1de1ef46ad";
export default function Home() {
  const { address } = useAccount();
  const [img, setImg] = useState("");
  const {
    data: dataRead,
    isError: isErrorRead,
    isLoading: isLoadingRead,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abiFile,
    functionName: "commonTokenURI",
  });
  const { data: dataMinted } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abiFile,
    functionName: "balanceOf",
    args: [address],
  });
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abiFile,
    functionName: "mint",
    args: [
      address,
      {
        value: ethers.utils.parseEther("0.001"),
      },
    ],
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    (async () => {
      if (dataRead) {
        const res = await (await fetch(dataRead as unknown as string)).json();
        setImg(res.image);
      }
    })();
  }, [dataRead]);

  useEffect(() => {
    console.log(dataMinted);
  }, [dataMinted]);

  return (
    <Container>
      <ConnectButton />
      <Text>This is the NFT we will be minting!</Text>
      <Box
        as={motion.div}
        borderColor="gray.200"
        borderWidth="1px"
        width="fit-content"
        marginTop="4"
        padding="6"
        shadow="md"
        rounded="lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <Image alt="nft image" width={200} height={200} src={img}></Image>
      </Box>
      <div>
        <Button isDisabled={!write || isLoading} onClick={write}>
          {isLoading ? "Minting..." : "Mint"}
        </Button>
        {isSuccess && (
          <div>
            Successfully minted your NFT!
            <div>
              <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
                Etherscan
              </a>
            </div>
          </div>
        )}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
        {dataMinted && (
          <Text>You Have Minted : {parseInt(dataMinted, 16)}</Text>
        )}
      </div>
    </Container>
  );
}
