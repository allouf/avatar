import axios from "axios";

const defaultHeader = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Record<string, unknown>
) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: method,
  body: JSON.stringify(options),
});

export const saveRecord = async (apiUrl: string, options?: any) => {
  return await axios
    .post(apiUrl, options, defaultHeader("POST", options))
    .then(function (response) {
      return response?.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });
};

export const getRecord = async (apiUrl: string, options?: any) => {
  return await axios
    .get(apiUrl, options)
    .then(function (response) {
      return response?.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });
};
