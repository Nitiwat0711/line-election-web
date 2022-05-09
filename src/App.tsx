import React from "react";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import Candidate from "./components/Candidate";

function App() {
  return (
    <Box>
      <Navbar />
      <Candidate />
    </Box>
  );
}

export default App;
