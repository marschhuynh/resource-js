/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import axios from 'axios'
import { IDataLayer } from './interface'
import Module, { ModuleOption } from '../module'


class HTTPLayer implements IDataLayer {
    _namespace: string
    _maner: any

    static http_manner: any = {}
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
            validateStatus: function (status) {
                return status >= 200 && status < 300
            },
        })
        HTTPLayer.INSTANCE[namespace] = this
        return HTTPLayer.INSTANCE[namespace]
    }

    static _request(method: string, args: any) {
        return HTTPLayer.INSTANCE['default']._maner({
            method,
            ...args
        })
    }

    static GET(url: string, args?: any) {
        return this._request('get', {url, ...args})
    }

    static POST(url: string, args?: any) {
        return this._request('post', {url, ...args})
    }

    static PATCH(url: string, args?: any) {
        return this._request('patch', {url, ...args})
    }

    static PUT(url: string, args?: any) {
        return this._request('put', {url, ...args})
    }

    static DELETE(url: string, args?: any) {
        return this._request('delete', {url, ...args})
    }

    async get(url: string) {
        return await HTTPLayer._request('get', url)
    }
    
    async post(url: string, args?: any) {
        return await HTTPLayer._request('post', {url, ...args})
    }
    
    async update(url: string, args?: any) {
        return await HTTPLayer._request('patch', {url, ...args})
    }
    
    async replace(url: string, args?: any) {
        return await HTTPLayer._request('put', {url, ...args})
    }
    
    async delete(url: string) {
        return await HTTPLayer._request('delete', url)
    }
}

export default HTTPLayer