/*
    FilterItem:
        { key: 'name', op: 'eq', value: 'thien' }
    FilterService
    __filter: {
        name: { active: true, key: 'name', op: 'eq', value: 'thien' }
        age: { active: true, key: 'name', op: 'or', value: [23, 25] }
        age: { active: true, key: 'name', op: 'gt', value: 23 }
    }
    compileFilter() {
        name: thien,
        age: { $or: [23, 25] }
        age: { $gt: 23 }
    }
*/

type FilterItem = {
    active?: boolean
    key: string
    op?: string
    value: number | string | Array<number> | Array<string> | FilterItem | FilterItem[]
}

export default class FilterService {
    [index: string]: any
    __filter: {[key:string]: FilterItem}
    __defaultFilter: any

    constructor(defaultFilter: any = {}) {
        this.__defaultFilter = defaultFilter;
        this.__filter = {};

        for (let f in this.__defaultFilter) {
            this.activeFilter(f, this.__defaultFilter[f])
        }
    }

    isFilterActive(key: string) {
        return Boolean(this.__filter[key]);
    }

    activeFilter(key: string, value: FilterItem) {
        this.__filter[key] = value;
        this.__filter[key].active = true;
    }

    deActiveFilter(key: string) {
        this.__filter[key].active = false;
    }

    op__default(filter: any) {
        const { value } = filter;
        return value
    }

    op__eq(filter: any) {
        const { value } = filter;
        return { '$eq': value}
    }

    op__gt(filter: any) {
        const { value } = filter;
        return { '$gt': value}
    }

    op__lt(filter: any) {
        const { value } = filter;
        return { '$lt': value}
    }

    op__or = (filter: any) => {
        const { value } = filter;
        if (value as FilterService) {
            return { '$or': value.map((item: FilterItem) => this._compile(item))}
        }
        return { '$or': value}
    }

    op__and = (filter: any) => {
        const { value } = filter;
        if (value as FilterService) {
            return { '$and': value.map((item: FilterItem) => this._compile(item))}
        }
        return { '$and': value}
    }

    get_op = (opName: string): Function => {
        if (this[opName]) {
            return this[opName]; 
        }
        return this.op__default;
    }

    _compile(filter: FilterItem) {
        const operator: Function = this.get_op(`op__${filter.op}`)
        return operator(filter); 
    }

    compileFilter() {
        const result: any = {}
        const filter = Object.assign({}, this.__defaultFilter, this.__filter);
        for (let key in filter) {
            const filter = this.__filter[key]
            if (filter.active) {
                result[key] = this._compile(filter);
            }
        }
        return result;
    }
}