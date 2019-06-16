import FilterService from './filter';
export default class PaginationService<T> {
    __query: any;
    __data: Array<T>;
    __selectedItems: Array<T>;
    __activeItems: T;
    __resource: T;
    __fetching: Boolean;
    __meta: any;
    filterService: FilterService;
    constructor(resource: T, defaultFilter?: any);
    readonly data: T[];
    readonly page: any;
    readonly pageSize: any;
    readonly total: any;
    readonly query: {
        meta: any;
        filter: any;
    };
    setMeta(value: any): void;
    getResource(): T;
    setResource(resource: any): void;
    nextPage(): void;
    previousPage(): void;
    setPage(value: number): void;
    setPageSize(value: number): void;
    _fetchData(): Promise<any>;
    _setResponse(response: any): Promise<T[]>;
    _setMeta(value: any): void;
    refresh: () => Promise<T[]>;
}
