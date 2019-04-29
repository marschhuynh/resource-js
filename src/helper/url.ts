import { ViewParam, MetaParam } from '../types';


function safeUrl(value: string): string {
    return encodeURIComponent(JSON.stringify(value));
}

function paramize(value: any): string {
    return Object.keys(value)
                .filter(Boolean)
                .map((key: string) => `${key}=${safeUrl(value[key])}`)
                .join('&')
}

function paramBuilder(view: ViewParam): string {
    let result: string;
    let _params: Array<any> = [view.params, view.meta, view.sort].filter(Boolean)
    let _next: any = Object.assign({}, ..._params);
    result = paramize(_next);
    return result;
}

class QueryParam {
    private _meta: MetaParam
    private _params: Object
    private _sort: Object
    constructor(params: Object, meta: MetaParam, sort: Object) {
        this._params = params;
        this._meta = meta;
        this._sort = sort;
    }
}

export default { QueryParam, paramize, paramBuilder };