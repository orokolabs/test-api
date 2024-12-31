import { useEffect } from "react";
import request from "axios";

export const useRequestInstance = () => {
  useEffect(() => {
    const requestIntercept = request.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = request.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      request.interceptors.request.eject(requestIntercept);
      request.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return request;
};
