import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { VoteAPI } from "../../apis/vote";

export default function VoteModal({ isOpen, onClose, candidate }: any) {
  const toast = useToast();
  const [nationalId, setNationalId] = useState("");
  const handleNationalIdChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setNationalId(e.target.value);
  const isError = nationalId === "" || nationalId.length !== 13;

  const onSubmitVote = async () => {
    if (!isError) {
      const response = await VoteAPI.vote(nationalId, candidate.id);
      if (response?.data.status === "ok") {
        onClose();
        return toast({
          title: "Success!",
          description: "Vote Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      if (response?.data.status === "error") {
        if (response.data.message === "Already Voted") {
          return toast({
            title: "Can't vote again",
            description: "You have already voted.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

        if (response.data.message === "Election is closed") {
          return toast({
            title: "Election is closed.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      return toast({
        title: "Error",
        description: "Something went wrong, please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    toast({
      title: "Input Invalid",
      description: "National ID is required and must have 13 characters.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"2xl"}>
            Please enter your National ID to confirm your vote
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="number">National ID</FormLabel>
              <Input
                id="nationalId"
                type={"number"}
                onChange={handleNationalIdChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSubmitVote();
                  }
                }}
              />
              {isError && (
                <FormErrorMessage>
                  National ID is required and must have 13 characters.
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSubmitVote}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
