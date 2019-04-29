import { ViewParam, ResourceConfig, IRawParams } from './types';
import { HTTPLayer } from './datalayer';
declare class DefaultModel {
    _id: string;
    _etag: string;
    _updated: string;
    _created: string;
}
export default class BaseResource extends DefaultModel {
    _origin: IRawParams;
    _data: IRawParams;
    _config: ResourceConfig;
    _changed: string[];
    constructor(data?: any);
    static item_transform(response: any, Resource: any): any;
    static list_transform(response: any, Resource: any): any;
    static readonly datalayer: HTTPLayer;
    static readonly config: any;
    static QUERY(view?: ViewParam): Promise<any[]>;
    static CREATE(data: Object): Promise<any>;
    static UPDATE(view: ViewParam, data: Object): Promise<any>;
    static REPLACE(view: ViewParam, data: Object): Promise<any>;
    static DELETE(view?: ViewParam): Promise<boolean>;
    create(): Promise<any>;
    update(): Promise<any>;
    _getChange(): any;
    save(): Promise<this>;
}
export {};
