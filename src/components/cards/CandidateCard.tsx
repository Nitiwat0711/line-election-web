import React from "react";
import {
  Box,
  Image,
  AspectRatio,
  Heading,
  Text,
  Flex,
  Spacer,
  Center,
  Button,
  useDisclosure,
  Progress,
  ProgressLabel,
} from "@chakra-ui/react";
import { CandidateModel } from "../../model/candidate";
import VoteModal from "../modals/VoteModal";
import { calculateDiffYear } from "../../helpers/calculate";

interface candidatesProps {
  candidate: CandidateModel.returnValue;
  voteEnable: boolean;
}

export default function CandidateCard({
  candidate,
  voteEnable,
}: candidatesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        maxW={"335px"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={"whiteAlpha.100"}
      >
        <Box position={"relative"}>
          <AspectRatio h={"240px"}>
            <Image
              src={candidate.imageLink.replace("<", "").replace(">", "")}
              alt={candidate.name}
            ></Image>
          </AspectRatio>
          <Box position={"absolute"} right={"3%"} top={"1%"}>
            <Heading
              color={"white"}
              size="4xl"
              fontSize="120px"
              textShadow={"3px 10px 40px #171923"}
            >
              {candidate.id}
            </Heading>
          </Box>
        </Box>
        <Box p={2}>
          <Flex>
            <Heading size="lg" fontWeight={"semibold"} isTruncated pr={10}>
              {candidate.name}
            </Heading>
            <Spacer />
            <Heading size="lg" fontWeight={"semibold"}>
              {candidate.votedCount}
            </Heading>
          </Flex>
          <Flex>
            <Text fontSize={"lg"} color="GrayText">
              {calculateDiffYear(candidate.dob)} yrs
            </Text>
            <Spacer />
            <Text fontSize={"lg"} color="GrayText">
              votes
            </Text>
          </Flex>

          <Center my={"5"} h={"80px"}>
            <Text
              align={"center"}
              fontSize="xl"
              noOfLines={3}
              color={"blackAlpha.800"}
            >
              {`"${candidate.policy}"`}
            </Text>
          </Center>
          {voteEnable ? (
            <Box p={5}>
              <Button
                colorScheme="teal"
                width={"100%"}
                size="lg"
                onClick={onOpen}
              >
                Vote
              </Button>
            </Box>
          ) : (
            <Box py={5} px={3}>
              <Progress
                hasStripe
                isAnimated
                colorScheme="green"
                height="32px"
                value={parseInt(candidate.percentage || "0")}
                borderRadius="lg"
              >
                <ProgressLabel fontSize={"md"} color={"blackAlpha.800"}>
                  {candidate.percentage}
                </ProgressLabel>
              </Progress>
            </Box>
          )}
        </Box>
      </Box>

      <VoteModal isOpen={isOpen} onClose={onClose} candidate={candidate} />
    </>
  );
}
