import { ViewParam, ResourceConfig } from '../types';
declare function item_transform<T>(response: any, newInstance: any): T;
declare function list_transform<T>(response: any, newInstance: any): any;
export declare const DefaultConfig: {
    item_transform: typeof item_transform;
    list_transform: typeof list_transform;
};
export default class ResourceHelper {
    static queryParamBuilder(view: ViewParam): string;
    static getListUrl(config: ResourceConfig, view?: ViewParam): string;
    static fillPathParams(config: ResourceConfig, params: any): any[];
    static getItemUrl(config: ResourceConfig, view: ViewParam, data?: any): string;
}
export {};
