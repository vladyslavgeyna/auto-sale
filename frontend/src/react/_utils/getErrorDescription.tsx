import { ApiError } from "@/queries";

export const getErrorDescription = ({ response }: ApiError) => {
  const errorMessage = response?.data.message;

  return Array.isArray(errorMessage)
    ? errorMessage.map((message) => <p>{message}</p>)
    : errorMessage;
};
