import React from "react";
import { Heading, Flex, Spacer, Center } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Center bg="#68D391" w="100%" p={5} color="white">
      <Flex>
        <Heading as="h3" size={"lg"}>
          Line Town Election
        </Heading>
        <Spacer />
        {/* <Link ml={3}>Login</Link>
        <Link ml={3}>Sign Up</Link> */}
      </Flex>
    </Center>
  );
}
