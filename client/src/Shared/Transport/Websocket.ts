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

interface emitRequestType {
  url: string;
  message: string;
  data?: any;
}

interface WebsocketType {
  ioList: ioListType;
  baseUrl: string;
  _initIO(url: string): Socket;
  subscribe(request: requestType): WebsocketType;
  emit(request: emitRequestType): WebsocketType;
  destroy(path: string): void;
}

const Websocket: WebsocketType = {
  ioList: {},
  baseUrl: BASE_URL,
  subscribe: (request) => {
    Websocket._initIO(request.url);
    Websocket.ioList[request.url].on(request.data.message, (data: any) => {
      request.data.cb(data);
    });
    return Websocket;
  },

  emit: (request: emitRequestType) => {
    Websocket._initIO(request.url).emit(request.message, request.data);
    return Websocket;
  },

  _initIO: (url: string) => {
    if (!Websocket.ioList[url]) {
      Websocket.ioList[url] = io(Websocket.baseUrl + url, {
        transports: ["websocket"],
      });
    }
    return Websocket.ioList[url];
  },

  destroy: (path: string) => {
    if (Websocket.ioList[path]) {
      Websocket.ioList[path].disconnect();
      delete Websocket.ioList[path];
    }
  },
};

export default Websocket;
