import BaseResource from './resource'
import { Model, Attribute } from './decorator'
import { ModuleOption } from './module'
import FilterService from './service/filter'
import PaginationService from './service/pagination'
declare const ResourceSetup: (namespace: string, options: ModuleOption) => any
export { BaseResource, Model, Attribute, ResourceSetup, FilterService, PaginationService }
