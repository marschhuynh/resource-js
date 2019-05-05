import BaseResource from './resource';
import { Model, Attribute } from './decorator';
import { ModuleOption } from './module';
import { FilterService } from './service';
declare const ResourceSetup: (namespace: string, options: ModuleOption) => void;
export { BaseResource, Model, Attribute, ResourceSetup, FilterService };
