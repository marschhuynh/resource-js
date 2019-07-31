import { ViewParam, ResourceConfig, MetaParam } from '../types'
import URLHelper from './url'

function item_transform<T>(response: any, newInstance: any): T {
    const data: any = response['data']
    return newInstance(data)
}

function list_transform<T>(response: any, newInstance: any): any {
    let data: {_items: T[]; _meta: MetaParam} = response['data']
    data['_items'] = data['_items'].map(item => newInstance(item))
    data['_meta'] = data['_meta']
    return data
}

export const DefaultConfig = {
    item_transform: item_transform,
    list_transform: list_transform
}

export default class ResourceHelper {
    static queryParamBuilder(view: ViewParam): string {
        let result: string
        let _params: any[] = [view.params, view.meta, view.sort].filter(Boolean)
        let _next: any = Object.assign({}, ..._params)
        result = URLHelper.paramize(_next)
        return result
    }

    static getListUrl(config: ResourceConfig, view: ViewParam = {}) {
        const params: string = this.queryParamBuilder(view)
        return [config.list_url, params].filter(Boolean).join('?')
    }

    static fillPathParams(config: ResourceConfig, params: any) {
        let url = config.item_url
        // Matching string like: /post/<string:_id>
        const urlParams: RegExpMatchArray = url.match(/<((.+?):(.+?))>/g)

        for (let i in urlParams) {
            let item: string = urlParams[i].replace(/[\<\>]/g, '')
            let [type, key] = item.split(':')
            if (!(params[key])) throw Error(`Params [${key}] is required`)
            url = url.replace(`<${type}:${key}>`, params[key])
            delete params[key]
        }
        
        return [url, params]
    }

    static getItemUrl(config: ResourceConfig, view: ViewParam, data: any = {}) {
        const params = {...view.params, ...data}
        const [pathParamFilled, _params] = this.fillPathParams(config, params)
        const queryParams: string = this.queryParamBuilder({params: _params})
        return [pathParamFilled, queryParams].filter(Boolean).join('?')
    }
}