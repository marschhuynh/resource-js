interface AttributeType {
    type: string;
    required?: boolean;
    pattern?: string;
}
export declare function Model(list_url: string, item_url?: string, namespace?: string): (target: any) => any;
export declare function Attribute(option?: AttributeType): Function;
export {}
