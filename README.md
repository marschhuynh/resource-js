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
    - DELETE(id) Boolean : delete a resource
- Items methods:
    - create(data): save a resource items
    - update(id, data): save a resource items
    - save(): save a resource items
    - delete(): delete a resource items

### Setup module

```ts
ResourceSetup('default', { base_url: 'https://api.me.com' })
```

### Deleration resource

```ts
@Model('/post', '/post/<string:_id>')
class Post extends BaseResource {

    @Attribute({type: 'string'})
    title: string;

    @Attribute()
    content: string;

    @Attribute()
    author: string;
}

```


### Query list resource

```ts
    const instances = Post.QUERY({
        params: { title: "This is a title" },
        sort: { name: 1 },
        meta: { page: 1, max_results: 25 }
    })
    instances[0].author = 'admin'
    instances[0].save()
```


### Find one resource
```ts
    const instance = Post.FIND('this is a id');
    instance.author = "new name";
    instance.save();
```


### Create a new resource
```ts
    const instance = Post.CREATE({title: "This is a title", content: "Content of this post"});
    instance.content = "Edited"
    instance.save()
```