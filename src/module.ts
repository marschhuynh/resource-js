export type ModuleOption = {
    base_url: string
}

export default class Module {
    private static INSTANCE: {[index:string]: Module} = {}
    _options: ModuleOption

    constructor(namespace: string = 'default', options?: ModuleOption) {
        this._options = options;
        console.log('New module', namespace);
        
        Module.INSTANCE[namespace] = this;
    }

    static getModule(namespace: string) {
        if (Module.INSTANCE[namespace]) {
           return Module.INSTANCE[namespace] 
        }
        throw Error(`Namespace [${namespace}] is not exist. Please setup Resource Module before use it.`)
    }

    get options() {
        return this._options;
    }

    set options(value: ModuleOption) {
        this._options = value;
    }
}