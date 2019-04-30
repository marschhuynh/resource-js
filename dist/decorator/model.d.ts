declare type AttributeType = {
    type: string;
};
export declare function Model(list_url: string, item_url: string, namespace?: string): (target: any) => any;
export declare function Attribute(option?: AttributeType): Function;
export {};
