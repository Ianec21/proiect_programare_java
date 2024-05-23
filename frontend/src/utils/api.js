import axios from "axios";
import {useEffect, useState} from "react";

export const fetchData = async(url, postData) => {
  let loading = true;
  let data = null;
  let error = null;

  if(postData){
    await axios.post("http://localhost:8081" + url, postData).then((response) => {
      data = response.data;
      console.log(response.data);
    }).catch((error) => {
      error = error.data.message;
    }).finally(() => {
      loading = false;
    });
  } else {
    await axios.get("http://localhost:8081" + url).then((response) => {
      data = response.data;
    }).catch((error) => {
      error = error.data.message;
    }).finally(() => {
      loading = false;
    });
  }

  return {data, error, loading};
}