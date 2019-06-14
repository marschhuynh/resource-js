import FilterService from './filter';


export default class PaginationService<T> {
    __query: any
    __data: Array<T> = []
    __selectedItems: Array<T> = []
    __activeItems: T
    __resource: T
    __fetching: Boolean
    __meta: any

    filterService: FilterService

    constructor(resource: T, defaultFilter: any = {}) {
        this.__resource = resource;
        this.__fetching = false;
        this.__meta = {max_results: 25, page: 1};

        this.filterService = new FilterService(defaultFilter);
        this.__query = {
            meta: this.__meta,
            filter: this.filterService.compileFilter(),
        }
    }

    get data() {
        return this.__data;
    }

    get page() {
        return this.__meta.page;
    }

    get pageSize() {
        return this.__meta.max_results;
    }

    get total() {
        return this.__meta.total;
    }

    get query() {
        return {
            meta: this.__meta,
            filter: this.filterService.compileFilter(),
        }
    }

    setMeta(value: any) {
        this.__meta = value;
    }

    getResource () {
        return this.__resource
    }

    setResource (resource: any) {
        this.__resource = resource;
    }

    nextPage() {
        this.__meta = {
            ...this.__meta,
            page: this.__meta.page + 1
        }
    }

    previousPage() {
        this.__meta = {
            ...this.__meta,
            page: this.__meta.page == 1 ? 1 : this.__meta.page - 1
        }
    }

    setPage(value: number) {
        this.__meta = {
            ...this.__meta,
            page: value
        }
    }

    setPageSize(value: number) {
        this.__meta = {
            ...this.__meta,
            max_results: value
        }
    }

    async _fetchData() {
        // Begin fetching process
        // Output will be a list instance of Resource
        this.__fetching = true;
        return await (this.__resource as any).QUERY(this.query, true);
    }

    async _setResponse(response: any) {
        // Finish fetching process
        this.__data = response['_items'];
        this.__meta = response['_meta'];
        this.__fetching = false;
        return this.__data;
    }
    
    _setMeta(value: any) {
        this.__meta = value;
    }

    refresh = async () => {
        // Fetching process
        return await this._setResponse(await this._fetchData());
    }
}