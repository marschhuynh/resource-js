interface FilterItem {
    active?: boolean;
    key: string;
    op?: string;
    value: number | string | number[] | string[] | FilterItem | FilterItem[];
}
export default class FilterService {
    [index: string]: any;
    __filter: {
        [key: string]: FilterItem;
    };
    __defaultFilter: any;
    constructor(defaultFilter?: any);
    isFilterActive(key: string): boolean;
    activeFilter(key: string, value: FilterItem): void;
    deActiveFilter(key: string): void;
    op__default(filter: any): any;
    op__eq(filter: any): {
        '$eq': any;
    };
    op__gt(filter: any): {
        '$gt': any;
    };
    op__lt(filter: any): {
        '$lt': any;
    };
    op__or: (filter: any) => {
        '$or': any;
    };
    op__and: (filter: any) => {
        '$and': any;
    };
    get_op: (opName: string) => Function;
    _compile(filter: FilterItem): any;
    compileFilter(): any;
}
export {}
