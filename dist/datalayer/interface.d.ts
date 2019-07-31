export interface IDataLayer {
    get: (url: string) => any;
    post: (url: string, data: Record<string, any>) => any;
    update: (url: string, data: Record<string, any>) => any;
    replace: (url: string, data: Record<string, any>) => any;
    delete: (url: string) => any;
}
