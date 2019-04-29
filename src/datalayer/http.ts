import axios from 'axios';
import { IDataLayer } from './interface';

const Axios = axios.create({
    baseURL: "http://me.com:5000",
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});


function urlBuilder(url: string): string {
    return [url].join('/');
}

class HTTPLayer implements IDataLayer {
    _request(method: string, url: string, data?: any) {
        if (data) return Axios({
            method, 
            url: urlBuilder(url),
            data
        });
        return Axios({
            method,
            url: urlBuilder(url)
        });
    }
    
    get(url: string) {
        console.log(`get => ${url}`)
        return this._request('get', url);
    }
    
    post(url: string, data: Object) {
        console.log(`post => `, data)
        return this._request('post', url, data);
    }
    
    update(url: string, data: Object) {
        console.log(`update => ${url}`)
        return this._request('patch', url, data);
    }
    
    replace(url: string, data: Object) {
        console.log(`replace => ${url}`)
        return this._request('put', url, data);
    }
    
    delete(url: string) {
        console.log(`delete => ${url}`)
        return this._request('delete', url);
    }
}

export default HTTPLayer;