import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage.js";
import { clearStore } from "../features/user/userSlice.js";

const customFetch = axios.create({
  baseURL: "https://jobsync-api.onrender.com/api/v1",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();

    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized access denied. Logging out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
