/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import axios from 'axios'
import { IDataLayer } from './interface'
import Module, { ModuleOption } from '../module'


function urlBuilder(url: string): string {
    return [url].join('/')
}

class HTTPLayer implements IDataLayer {
    _namespace: string
    _maner: any
    static INSTANCE: { [index: string]: HTTPLayer } = {}
    
    constructor(namespace: string) {
        this._namespace = namespace
        if (!HTTPLayer.INSTANCE[namespace]) {
            HTTPLayer.INSTANCE[namespace] = this
        }
        const moduleOptions: ModuleOption = Module.getModule(this._namespace).options
        
        this._maner = axios.create({
            baseURL: moduleOptions.BASE_URL,
            timeout: 1000,
        })
        HTTPLayer.INSTANCE[namespace] = this
        return HTTPLayer.INSTANCE[namespace]
    }

    _request(method: string, url: string, data?: any): any {
        if (data) return this._maner({
            method, 
            url: urlBuilder(url),
            data
        })
        return this._maner({
            method,
            url: urlBuilder(url)
        })
    }
    
    get(url: string) {
        console.log(`get => ${url}`)
        return this._request('get', url)
    }
    
    post(url: string, data: Record<string, any>) {
        console.log('post => ', data)
        return this._request('post', url, data)
    }
    
    update(url: string, data: Record<string, any>) {
        console.log(`update => ${url}`)
        return this._request('patch', url, data)
    }
    
    replace(url: string, data: Record<string, any>) {
        console.log(`replace => ${url}`)
        return this._request('put', url, data)
    }
    
    delete(url: string) {
        console.log(`delete => ${url}`)
        return this._request('delete', url)
    }
}

export default HTTPLayer