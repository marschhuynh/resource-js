type AttributeType = {
    type: string
}


export function Model(option?: any): Function {
    return function(target: any) {
        return target;
    }
}

export function Attribute(name: string, option: AttributeType): Function {
    return function(target: any) {
        if (!target.constructor.schema) {
            target.constructor.schema = {}
        }
        target.constructor.schema[name] = option.type;

        return target;
    }
}