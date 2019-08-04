import { IDataLayer } from './interface';
declare class HTTPLayer implements IDataLayer {
    _namespace: string;
    _maner: any;
    static http_manner: any;
    static INSTANCE: {
        [index: string]: HTTPLayer;
    };
    constructor(namespace: string);
    static _request(method: string, args: any): any;
    static GET(url: string, args?: any): any;
    static POST(url: string, args?: any): any;
    static PATCH(url: string, args?: any): any;
    static PUT(url: string, args?: any): any;
    static DELETE(url: string, args?: any): any;
    get(url: string): Promise<any>;
    post(url: string, args?: any): Promise<any>;
    update(url: string, args?: any): Promise<any>;
    replace(url: string, args?: any): Promise<any>;
    delete(url: string): Promise<any>;
}
export default HTTPLayer;
