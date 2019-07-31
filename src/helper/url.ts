import { ViewParam, MetaParam } from '../types'


function safeUrl(value: string): string {
    return encodeURIComponent(JSON.stringify(value))
}

function paramize(value: any): string {
    return Object.keys(value)
        .filter(Boolean)
        .map((key: string) => `${key}=${safeUrl(value[key])}`)
        .join('&')
}

function paramBuilder(view: ViewParam): string {
    let result: string
    let _params: any[] = [view.params, view.meta, view.sort].filter(Boolean)
    let _next: any = Object.assign({}, ..._params)
    result = paramize(_next)
    return result
}

class QueryParam {
    private _meta: MetaParam
    private _params: Record<string, any>
    private _sort: Record<string, any>
    constructor(params: Record<string, any>, meta: MetaParam, sort: Record<string, any>) {
        this._params = params
        this._meta = meta
        this._sort = sort
    }
}

export default { QueryParam, paramize, paramBuilder }