import axios from "axios";
import { CRUX_API_ENDPOINT, RESOURCE } from "./constants";

const axiosInstance = axios.create({
  baseURL: CRUX_API_ENDPOINT,
});

const API_KEY = process.env.REACT_APP_CRUX_APP_API_KEY;

class CrUX {
  read() {
    return axiosInstance.get(`${RESOURCE}?key=${API_KEY}`);
  }

  create(body) {
    return axiosInstance.post(`${RESOURCE}?key=${API_KEY}`, body);
  }

  bulkCreate(multipleBodies) {
    const bodyList = multipleBodies.map((body) => {
      return this.create(body);
    });
    return Promise.allSettled(bodyList).then((data) => {
      return data;
    });
  }
}

export const cruxAPI = new CrUX();
