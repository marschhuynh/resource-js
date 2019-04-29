import { IDataLayer } from './interface';
declare class HTTPLayer implements IDataLayer {
    _request(method: string, url: string, data?: any): import("axios").AxiosPromise<any>;
    get(url: string): import("axios").AxiosPromise<any>;
    post(url: string, data: Object): import("axios").AxiosPromise<any>;
    update(url: string, data: Object): import("axios").AxiosPromise<any>;
    replace(url: string, data: Object): import("axios").AxiosPromise<any>;
    delete(url: string): import("axios").AxiosPromise<any>;
}
export default HTTPLayer;
