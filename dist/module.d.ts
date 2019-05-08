export declare type ModuleOption = {
    BASE_URL: string;
    LIST_DATA_KEY: string;
    LIST_META_KEY: string;
};
export default class Module {
    private static INSTANCE;
    _options: ModuleOption;
    constructor(namespace?: string, options?: ModuleOption);
    static getModule(namespace: string): Module;
    options: ModuleOption;
}
