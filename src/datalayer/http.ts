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
            validateStatus: function (status) {
                return status >= 200 && status < 300 // default
            },
        })
        HTTPLayer.INSTANCE[namespace] = this
        return HTTPLayer.INSTANCE[namespace]
    }

    _request(method: string, url: string, data?: any): Promise<any> {
        const request = {
            method, 
            url: urlBuilder(url),
        }
        if (data) request['data'] = data

        console.log('URL', request)
        
        return new Promise((resolve, reject) => {
            return axios(request)
                .then(resolve)
                .catch((error: any) => {
                    console.log('Reject', reject(error.response))
                    throw error.responser
                })
        })
    }
    
    async get(url: string) {
        console.log(`get => ${url}`)
        return await this._request('get', url)
    }
    
    async post(url: string, data: Record<string, any>) {
        console.log('post => ', data)
        let response = null
        try {
            response = await this._request('post', url, data)
        } catch(e) {
            console.log('POST ERROR', e)
            return e
        }
        return response
    }
    
    async update(url: string, data: Record<string, any>) {
        console.log(`update => ${url}`)
        return await this._request('patch', url, data)
    }
    
    async replace(url: string, data: Record<string, any>) {
        console.log(`replace => ${url}`)
        return await this._request('put', url, data)
    }
    
    async delete(url: string) {
        console.log(`delete => ${url}`)
        return await this._request('delete', url)
    }
}

export default HTTPLayer