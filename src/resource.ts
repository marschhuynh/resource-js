import { ViewParam, ResourceConfig, RawParams } from './types'
import ResourceHelper, { DefaultConfig } from './helper/resource'
import { HTTPLayer } from './datalayer'


class DefaultModel {
    _id: string
    _etag: string
    _updated: string
    _created: string
}

export default class BaseResource extends DefaultModel {
    _origin: RawParams
    _data: RawParams
    _config: ResourceConfig
    _changed: string[] = []
    static _schema: any

    constructor(data: any = {}) {
        super()
        this._origin = Object.assign({}, data)
        this._data = Object.assign({}, data)
        
        let attributes = Object.getOwnPropertyDescriptors((this.constructor as any).schema)
        
        attributes = Object.assign({}, attributes, {
            _id: {writable: true},
            _etag: {writable: false},
            _created: {writable: false},
        })
        
        for(let key in attributes) {
            if (attributes[key].writable) {
                Object.defineProperty(this, key, {
                    get: () => { return this._data[key] },
                    set: (value: any) => {
                        if (this._data[key] !== value) {
                            this._data[key] = value
                            this._changed.push(key)
                        }
                    }
                })
            } else {
                Object.defineProperty(this, key, {
                    get: () => { return this._data[key] },
                })
            }
        }
    }

    static get schema() {
        return this._schema
    }

    static item_transform(response: any, Resource: any) {
        return (this as any).config.item_transform(response, (item: any) => new Resource(item))
    }
    
    static list_transform(response: any, Resource: any) {
        return (this as any).config.list_transform(response, (item: any) => new Resource(item))
    }

    static get datalayer() {
        return new HTTPLayer('default')
    }

    static get config() {
        const meta = (this as any).meta()
        return Object.assign({}, DefaultConfig, meta)
    }

    static async QUERY(view: ViewParam = {}, meta: boolean = false) {
        const url: string = ResourceHelper.getListUrl(this.config, view)
        const response = await this.datalayer.get(url)
        if (meta) {
            return this.list_transform(response, this)
        }
        return this.list_transform(response, this)['_items']
    }

    static async CREATE(data: Record<string, any>): Promise<any> {
        const url: string = ResourceHelper.getListUrl(this.config)
        const response = await this.datalayer.post(url, data)
        console.log('CREATE', response)
        return this.item_transform(response, this)
    }

    static async UPDATE(view: ViewParam = {}, data: Record<string, any>): Promise<any> {
        const url: string = ResourceHelper.getItemUrl(this.config, view, (this.constructor as any)._data)
        const response = await this.datalayer.update(url, data)
        return (this as any).item_transform(response, this)
    }

    static async REPLACE(view: ViewParam = {}, data: Record<string, any>): Promise<any> {
        const url: string = ResourceHelper.getItemUrl(this.config, view)
        const response = await this.datalayer.replace(url, data)
        return (this as any).item_transform(response, this)
    }

    static async DELETE(view: ViewParam = {}): Promise<boolean> {
        const url: string = ResourceHelper.getItemUrl(this.config, view)
        const response = await this.datalayer.delete(url)
        return true
    }

    async create() {
        const data = await (this.constructor as any).CREATE(this._getChange())
        return data
    }

    async update() {
        console.log('Update')
        const data = await (this.constructor as any).UPDATE({params: {_id: this._id}}, this._getChange())
        return data
    }

    _getChange() {
        return this._changed.reduce((result: any, key: string) => Object.assign({}, result, {[key]: this._data[key]}), {})
    }

    async save() {
        console.log('Saving resource')
        let instance: any
        try {
            if (this._etag) {
                instance = await this.update()
            } else {
                instance = await this.create()
            }
        } catch(e) {
            throw e
        }
        this._data = instance._data
        this._origin = instance._origin
        return this
    }
}
