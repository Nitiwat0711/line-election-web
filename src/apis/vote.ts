import axios from "axios";

export namespace VoteAPI {
  export const vote = async (nationalId: string, candidateId: number) => {
    try {
      const response = await axios.post("/api/vote", {
        nationalId,
        candidateId,
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
