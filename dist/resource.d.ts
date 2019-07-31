import { ViewParam, ResourceConfig, RawParams } from './types'
import { HTTPLayer } from './datalayer'
declare class DefaultModel {
    _id: string;
    _etag: string;
    _updated: string;
    _created: string;
}
export default class BaseResource extends DefaultModel {
    _origin: RawParams;
    _data: RawParams;
    _config: ResourceConfig;
    _changed: string[];
    static _schema: any;
    constructor(data?: any);
    static readonly schema: any;
    static item_transform(response: any, Resource: any): any;
    static list_transform(response: any, Resource: any): any;
    static readonly datalayer: HTTPLayer;
    static readonly config: any;
    static QUERY(view?: ViewParam, meta?: boolean): Promise<any>;
    static CREATE(data: Record<string, any>): Promise<any>;
    static UPDATE(view: ViewParam, data: Record<string, any>): Promise<any>;
    static REPLACE(view: ViewParam, data: Record<string, any>): Promise<any>;
    static DELETE(view?: ViewParam): Promise<boolean>;
    create(): Promise<any>;
    update(): Promise<any>;
    _getChange(): any;
    save(): Promise<this>;
}
export {}
