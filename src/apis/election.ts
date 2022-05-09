import axios from "axios";

export namespace ElectionAPI {
  export const getStatus = async () => {
    try {
      const response = await axios.get("/api/election/status");
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const getResult = async () => {
    try {
      const response = await axios.get("/api/election/result");
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const exportToCSV = async () => {
    try {
      const response = await axios.get("/api/election/export", {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
