import axios from "axios";

// export default axios.create({
//     baseURL: "https://cors-anywhere.herokuapp.com/https://www.reddit.com/api/v1",
//     responseType: "json"
//   });
const authAxios = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://www.reddit.com/api/v1",
  responseType: "json"
});


const oAuthAxios = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://oauth.reddit.com",
  responseType: "json"
});

export {
  authAxios,oAuthAxios
}

  