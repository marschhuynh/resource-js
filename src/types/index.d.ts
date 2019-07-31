interface ResourceConfig {
    list_url: string;
    item_url: string;
    list_transform?: Function;
    item_transform?: Function;
    pre_hook?: Function[];
    post_hook?: Function[];
}

interface MetaParam {
    page: number;
    max_results: number;
    total: number;
}

interface ViewParam {
    params?: {[key: string]: any};
    meta?: {[key: string]: number};
    sort?: {[key: string]: string};
}

declare interface RawParams {
    [key: string]: any;
}

export {
    ResourceConfig,
    MetaParam, 
    ViewParam,
    RawParams
}