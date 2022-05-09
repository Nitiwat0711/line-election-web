import axios from "axios";

export namespace CandidateAPI {
  export const getCandidates = async () => {
    try {
      const response = await axios.get("/api/candidates");
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
