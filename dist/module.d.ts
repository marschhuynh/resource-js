export interface ModuleOption {
    BASE_URL: string;
    LIST_DATA_KEY: string;
    LIST_META_KEY: string;
    item_transform: () => any;
    list_transform: () => any;
}
export default class Module {
    private static INSTANCE;
    _options: ModuleOption;
    constructor(namespace?: string, options?: ModuleOption);
    static getModule(namespace: string): Module;
    options: ModuleOption;
}
