import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./constants";

interface subscribeDataType {
  message: string;
  cb(data: any): any;
}

interface ioListType {
  [index: string]: Socket;
}

export interface requestType {
  url: string;
  data: subscribeDataType;
}

class Websocket {
  ioList: ioListType = {};
  baseUrl: string = BASE_URL;
  subscribe = (request: requestType) => {
    if (!this.ioList[request.url]) {
      this.ioList[request.url] = io(this.baseUrl + request.url, {
        transports: ["websocket"],
      });
    }
    this.ioList[request.url].on(request.data.message, (data: any) => {
      request.data.cb(data);
    });
    this.ioList[request.url].emit(request.data.message);
  };

  destroy = (path: string) => {
    if (this.ioList[path]) {
      this.ioList[path].disconnect();
      delete this.ioList[path];
    }
  };
}

export default new Websocket();
