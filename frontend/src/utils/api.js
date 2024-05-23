import axios from "axios";

export const fetchData = async(url, postData) => {
  let loading = true;
  let data = null;
  let error = null;

  if(postData){
    return await axios.post("http://localhost:8081" + url, postData).then((response) => {
      data = response.data;
      return {data, error, loading};
    }).catch((error) => {
      error = error.response.data;
      return {data, error, loading};
    }).finally(() => {
      loading = false;
    });
  } else {
    return await axios.get("http://localhost:8081" + url).then((response) => {
      data = response.data;
      return {data, error, loading};
    }).catch((error) => {
      error = error.response.data;
      return {data, error, loading};
    }).finally(() => {
      loading = false;
    });
  }
}