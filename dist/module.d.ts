export declare type ModuleOption = {
    base_url: string;
};
export default class Module {
    private static INSTANCE;
    _options: ModuleOption;
    constructor(namespace?: string, options?: ModuleOption);
    static getModule(namespace: string): Module;
    options: ModuleOption;
}
