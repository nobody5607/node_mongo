const token = ""; //token=
const NOTY_URL = "https://notify-api.line.me/api/notify";
import Axios from "axios";
import utils from "../utils/utils";

const axios = Axios.create({
  timeout: 10000,
  withCredentials: true,
});

export default {
  notyMessage(message) {
    return new Promise(async (resolve, reject) => {
      ig = {
        method: "POST",
        url: NOTY_URL,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          message: message,
        },
      };
      let result = await axios(config);
      return Promise.resolve(result.data);
    });
  },
};
