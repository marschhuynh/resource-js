# Resource

## Specification
- Resource specification:
    - list_url: route of list resource
    - item_url: route of a item resource
    - schema: structor of resource
    - list_transform: transform function after get list resource
    - item_transform: transform function after get item resource
    - pre_hook: callback before an action
    - post_hook: callback after an action
- Resource methods:
    - QUERY(criteria: QueryParam) [Resource] : get list of resource
    - CREATE(data: Object) Resource : create a new resource
    - UPDATE(id, data: Object) Resource : update a resource
    - REPLACE(id, data: Object) Resource : replace a resource
    - DELETE(id) Resource : delete a resource
- Items methods:
    - create(data): save a resource items
    - update(id, data): save a resource items
    - save(): save a resource items
    - delete(): delete a resource items

### Setup module

```ts
ResourceSetup('default', { base_url: 'https://api.me.com' })
```

### Create a new resource

```ts
@Model('/post', '/post/<string:_id>')
class Post extends BaseResource {

    @Attribute({type: 'string'})
    title: string;

    @Attribute()
    content: string;
}
```

### Query list resource

```ts
    const result = Resource.QUERY({
        params: { name: "thien" },
        sort: { name: 1 },
        meta: { page: 1, max_results: 25 }
    })
```