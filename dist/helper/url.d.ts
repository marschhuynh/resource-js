import { ViewParam, MetaParam } from '../types';
declare function paramize(value: any): string;
declare function paramBuilder(view: ViewParam): string;
declare class QueryParam {
    private _meta;
    private _params;
    private _sort;
    constructor(params: Object, meta: MetaParam, sort: Object);
}
declare const _default: {
    QueryParam: typeof QueryParam;
    paramize: typeof paramize;
    paramBuilder: typeof paramBuilder;
};
export default _default;
