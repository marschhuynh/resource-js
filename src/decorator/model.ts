import { BaseResource } from "..";

type AttributeType = {
    type: string
}

export function Model(list_url: string, item_url: string, namespace: string = 'default') {
    return function(target: any) {
        const class_meta = target.meta && target.meta() || {}
        target.meta = () => {
            return Object.assign({}, {
                list_url,
                item_url,
                namespace
            }, class_meta)
        };
        return target;
    }
}

export function Attribute(option: AttributeType = {type: 'string'}): Function {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.constructor.schema) {
            target.constructor.schema = {}
        }
        target.constructor.schema[propertyKey] = option.type;

        return target;
    }
}