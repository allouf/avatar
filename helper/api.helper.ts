import axios from "axios";

export const saveRecord = async (apiUrl: string, options?: any) => {
  try {
    const response = await axios.post(apiUrl, options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If the error comes from Axios, you can get the detailed response from the server
      const message = error.response?.data?.error || "An error occurred";
      throw new Error(message);
    } else {
      // If the error is not from Axios, it's some other error in your application
      throw new Error("An error occurred");
    }
  }
};

export const getRecord = async (apiUrl: string, options?: any) => {
  try {
    const response = await axios.get(apiUrl, options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If the error comes from Axios, you can get the detailed response from the server
      const message = error.response?.data?.error || "An error occurred";
      throw new Error(message);
    } else {
      // If the error is not from Axios, it's some other error in your application
      throw new Error("An error occurred");
    }
  }
};