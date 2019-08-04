import BaseResource from './resource'
import { Model, Attribute } from './decorator'
import Module, { ModuleOption } from './module'
import FilterService from './service/filter'
import PaginationService from './service/pagination'
import HTTPLayer from './datalayer/http'

const ResourceSetup = (namespace: string = 'default', options: ModuleOption): any => {
    console.log('Setup module', namespace)
    return new Module(namespace, options)
}

export { 
    Attribute, 
    BaseResource, 
    FilterService,
    HTTPLayer,
    Model, 
    PaginationService,
    ResourceSetup
}