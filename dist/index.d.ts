import BaseResource from './resource';
import { Model, Attribute } from './decorator';
import { ModuleOption } from './module';
import FilterService from './service/filter';
import PaginationService from './service/pagination';
import HTTPLayer from './datalayer/http';
declare const ResourceSetup: (namespace: string, options: ModuleOption) => any;
export { Attribute, BaseResource, FilterService, HTTPLayer, Model, PaginationService, ResourceSetup };
