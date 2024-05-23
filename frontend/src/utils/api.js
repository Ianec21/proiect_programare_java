import axios from "axios";
import {useEffect, useState} from "react";

export const fetchData = async(url) => {
  let loading = true;
  let data = null;
  let error = null;

  await axios.get("http://localhost:8081" + url).then((response) => {
    data = response.data;
  }).catch((error) => {
    error = error.data.message;
  }).finally(() => {
    loading = false;
  });

  return {data, error, loading};
}