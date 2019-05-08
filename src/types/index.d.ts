declare type ResourceConfig = {
    list_url: string,
    item_url: string,
    list_transform?: Function,
    item_transform?: Function,
    pre_hook?: Function[],
    post_hook?: Function[],
}

declare type MetaParam = {
    page: number,
    max_results: number,
    total: number
}

declare type ViewParam = {
    params?: {[key:string]: any},
    meta?: {[key:string]: number},
    sort?: {[key:string]: string}
}

declare interface IRawParams {
    [key: string]: any
}

export {
    ResourceConfig,
    MetaParam, 
    ViewParam,
    IRawParams
}