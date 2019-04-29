export interface IDataLayer {
    get: (url: string) => any
    post: (url: string, data: Object) => any
    update: (url: string, data: Object) => any
    replace: (url: string, data: Object) => any
    delete: (url: string) => any
}