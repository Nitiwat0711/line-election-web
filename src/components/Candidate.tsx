import React, { useEffect, useState } from "react";
import { Wrap, WrapItem, Box, Center, Text, Button } from "@chakra-ui/react";
import CandidateCard from "./cards/CandidateCard";
import { CandidateAPI } from "../apis/candidate";
import { CandidateModel } from "../model/candidate";
import { ElectionAPI } from "../apis/election";
import { DownloadIcon } from "@chakra-ui/icons";
import { io } from "socket.io-client";

export default function Candidate() {
  const [candidates, setCandidates] = useState<CandidateModel.returnValue[]>(
    []
  );
  const [electionStatus, setElectionStatus] = useState<boolean | null>(null);

  const getElectionStatus = async () => {
    const response = await ElectionAPI.getStatus();

    if (response?.status === 200) {
      setElectionStatus(response.data.enable);
    }
  };

  const getCandidates = async () => {
    const response = await CandidateAPI.getCandidates();

    if (response?.status === 200) {
      setCandidates(response.data);
    }
  };

  const getElectionResult = async () => {
    const response = await ElectionAPI.getResult();

    if (response?.status === 200) {
      setCandidates(response.data);
    }
  };

  const getMaxVotedCandidate = () => {
    let maxVotedAmount: number = 0;
    let maxVoted: CandidateModel.returnValue | null = null;
    for (let i = 0; i < candidates.length; i++) {
      if (
        maxVoted === null ||
        (candidates[i].votedCount || 0) > maxVotedAmount
      ) {
        maxVoted = candidates[i];
        maxVotedAmount = candidates[i].votedCount;
      }
    }

    return maxVoted;
  };

  const exportToCSV = async () => {
    const response = await ElectionAPI.exportToCSV();
    console.log(response?.headers);
    const url = window.URL.createObjectURL(new Blob([response?.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "election-result.csv");
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    getElectionStatus();
    (() => {
      const socket = io(`${process.env.REACT_APP_API_ENDPOINT}`, {
        transports: ["websocket"],
      });
      socket.on("new-vote", (result) => {
        console.log(result);
        getElectionResult();
      });
    })();
    getElectionResult();
  }, []);
  return (
    <Box>
      {electionStatus === false && getMaxVotedCandidate()?.votedCount !== 0 && (
        <Box p={5} fontWeight="semibold" fontSize={"3xl"}>
          <Center>
            <Text>
              The new mayor is: #{getMaxVotedCandidate()?.id}{" "}
              {getMaxVotedCandidate()?.name}
            </Text>
          </Center>
          <Center>
            <Button onClick={exportToCSV}>
              Export CSV <DownloadIcon ml={"5px"} />
            </Button>
          </Center>
        </Box>
      )}
      <Wrap p={5} justify="center" spacingX="2%" spacingY={"3%"}>
        {candidates.map(
          (candidate: CandidateModel.returnValue, index: number) => {
            return (
              <WrapItem maxW={"100%"} key={index}>
                <CandidateCard
                  candidate={candidate}
                  voteEnable={electionStatus ? true : false}
                />
              </WrapItem>
            );
          }
        )}
      </Wrap>
    </Box>
  );
}
