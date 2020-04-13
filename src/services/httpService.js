import axios from "axios";
import { toast } from "react-toastify";

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
axios.interceptors.response.use(null, (error) => {
  console.log("error intercepted", error.response.body);
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log("Error : ", error);
    toast.error("Une erreur innatendue a été déclenchée");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJwt
};
