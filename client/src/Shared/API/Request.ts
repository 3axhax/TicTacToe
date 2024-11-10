import axios from "axios";

type transport = 'axios' | 'websocket';
type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

class Request {
    transport: transport = 'axios';
    method: method = 'GET';
    target: string = '';
    baseUrl: string = 'http://localhost:5050';
    data: {} = {};


    _setTarget = (url: string = '') => {
        if (url) {
            this.target = url;
        }
    }

    // @ts-ignore
    _send = (): Promise<any> => {
        switch (this.transport) {
            case 'axios':
                return axios({
                    url: this.baseUrl + this.target,
                    method: this.method,
                    data: this.data,
                });
        }
    }

    xml = () => {
        this.transport = 'axios';
    }

    get = (url: string = '') => {
        this.method = 'GET';
        this._setTarget(url);
        return this._send();
    }

    post = (url:string = '', data: {} = {}): Promise<any> => {
        this.method = 'POST'
        this._setTarget(url);
        this.data = data;
        return this._send();
    }
}
export default new Request();