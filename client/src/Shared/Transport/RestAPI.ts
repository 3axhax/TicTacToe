import axios from "axios";
import { BASE_URL } from "./constants";

type method = "GET" | "POST" | "PUT" | "DELETE";

class RestAPI {
  method: method = "GET";
  target: string = "";
  baseUrl: string = BASE_URL;
  data: {} = {};

  _setTarget = (url: string = "") => {
    if (url) {
      this.target = url;
    }
  };

  _send = (): Promise<any> => {
    return axios({
      url: this.baseUrl + this.target,
      method: this.method,
      data: this.data,
    });
  };

  get = (url: string = "") => {
    this.method = "GET";
    this._setTarget(url);
    return this._send();
  };

  post = (url: string = "", data: {} = {}): Promise<any> => {
    this.method = "POST";
    this._setTarget(url);
    this.data = data;
    return this._send();
  };
}

export default new RestAPI();
