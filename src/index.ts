import BaseResource from './resource'
import { Model, Attribute } from './decorator'
import Module, { ModuleOption } from './module'
import FilterService from './service/filter'
import PaginationService from './service/pagination'

const ResourceSetup = (namespace: string = 'default', options: ModuleOption): any => {
    console.log('Setup module', namespace)
    return new Module(namespace, options)
}

export { 
    BaseResource, 
    Model, 
    Attribute, 
    ResourceSetup,
    FilterService,
    PaginationService
}