import { useEffect } from "react";
import { useAppDispatch } from "../redux";
import { logPageChange } from "../redux/metadataSlice";
import { usePage } from "./usePage";

export const useTimeLogger = () => {
  const { pageName } = usePage();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = {
      newPage: pageName,
      timestamp: Date.now(),
    };
    dispatch(logPageChange(action));
  }, [pageName]);
};
