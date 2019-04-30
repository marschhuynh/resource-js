import BaseResource from './resource';
import { Model, Attribute } from './decorator';
import Module, { ModuleOption } from './module';


const ResourceSetup = (namespace: string = 'default', options: ModuleOption) => {
    console.log('Setup module', namespace);

    // if (!Module.getModule(namespace)) {
        // return Module.getModule(namespace).options = options; 
    // }
    
    new Module(namespace, options);  
}

export { 
    BaseResource, 
    Model, 
    Attribute, 
    ResourceSetup
};