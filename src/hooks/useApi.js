import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";

const useApi = () => {
  return useContext(ApiContext);
};

export default useApi;
