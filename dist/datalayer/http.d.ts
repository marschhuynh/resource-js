import { IDataLayer } from './interface';
declare class HTTPLayer implements IDataLayer {
    _namespace: string;
    _maner: any;
    static INSTANCE: {
        [index: string]: HTTPLayer;
    };
    constructor(namespace: string);
    _request(method: string, url: string, data?: any): Promise<any>;
    get(url: string): Promise<any>;
    post(url: string, data: Record<string, any>): Promise<any>;
    update(url: string, data: Record<string, any>): Promise<any>;
    replace(url: string, data: Record<string, any>): Promise<any>;
    delete(url: string): Promise<any>;
}
export default HTTPLayer;
