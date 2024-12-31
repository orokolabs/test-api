"use client";
import React from "react";
import axios from "axios";
import { useQuery, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { useSidebarOptions } from "../sports";
import { useRequestInstance } from "./config";

export default function Call() {
  const { data: sidebar } = useSuspenseQuery(useSidebarOptions());
  console.log("sidebar: ", sidebar);

  return (
    <div className="flex flex-col gap-y-5">
      <Fetch />
      <Axios />
      <ReactQuery />
    </div>
  );
}

function Fetch() {
  async function getData() {
    const url = "https://test.api.betrebound.com/api/v1/currency";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("fetch response: ", json);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <button
      className="bg-gray-500 text-white w-10 px-10 rounded flex justify-center items-center py-5"
      onClick={getData}
    >
      Fetch
    </button>
  );
}

function Axios() {
  async function getData() {
    const url = "https://test.api.betrebound.com/api/v1/currency";
    try {
      const response = await axios.get(url);
      console.log("axios response: ", response?.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <button
      className="bg-gray-500 text-white w-10 px-10 rounded flex justify-center items-center py-5"
      onClick={getData}
    >
      Axios
    </button>
  );
}

const useGetCurrency = () => {
  const request = useRequestInstance();

  return useQuery({
    queryKey: ["get_currency"],
    queryFn: ({ signal }) =>
      request
        .get(`https://test.api.betrebound.com/api/v1/currency`, {
          signal,
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error?.response?.data?.message;
        }),
  });
};

export const useLogin = () => {
  const request = useRequestInstance();

  return useMutation({
    mutationFn: (values) =>
      request
        .post(`https://test.api.betrebound.com/api/v1/auth/login`, values)
        .then((res) => res.data)
        .catch((error) => {
          throw error?.response?.data?.message;
        }),
  });
};

function ReactQuery() {
  const { data, refetch } = useGetCurrency();
  console.log("react query response: ", data);
  const { mutate, data: loginData } = useLogin();
  console.log("loginData: ", loginData);

  return (
    <button
      className="bg-gray-500 text-white w-10 px-10 rounded flex justify-center items-center py-5"
      onClick={() => {
        refetch();
        mutate();
      }}
    >
      React Query
    </button>
  );
}
