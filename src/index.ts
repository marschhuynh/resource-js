import BaseResource from './resource';
import { Model, Attribute } from './decorator';
import Module, { ModuleOption } from './module';
import FilterService from './service/filter';
import PaginationService from './service/pagination';

const ResourceSetup = (namespace: string = 'default', options: ModuleOption) => {
    console.log('Setup module', namespace);
    new Module(namespace, options);  
}

export { 
    BaseResource, 
    Model, 
    Attribute, 
    ResourceSetup,
    FilterService,
    PaginationService
};