import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Container } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Home() {
  return (
    <Container>
      <ConnectButton />
    </Container>
  );
}
