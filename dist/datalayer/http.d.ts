import { IDataLayer } from './interface';
declare class HTTPLayer implements IDataLayer {
    _namespace: string;
    _maner: any;
    static INSTANCE: {
        [index: string]: HTTPLayer;
    };
    constructor(namespace: string);
    _request(method: string, url: string, data?: any): any;
    get(url: string): any;
    post(url: string, data: Record<string, any>): any;
    update(url: string, data: Record<string, any>): any;
    replace(url: string, data: Record<string, any>): any;
    delete(url: string): any;
}
export default HTTPLayer;
