import { BaseResource, Model, Attribute, ResourceSetup } from "../src";

ResourceSetup('default', { BASE_URL: 'https://api.me.com', LIST_DATA_KEY: '_items', LIST_META_KEY: '_meta' })

@Model('/post', '/post/<string:_id>')
class Post extends BaseResource {

    @Attribute({type: 'string', required: true})
    title: string;

    @Attribute()
    content: string;
}

async function main() {
    // try {
    //     const data = await Post.QUERY({
    //         meta: {
    //             page: 2,
    //             max_results: 3
    //         }
    //     });
 
    //     console.log('Data', data.length);
    //     if (data[0]) {
    //         data[0].title = "Thien";
    //         data[0].save();
    //     }
    //     await Post.CREATE({title: "This is a title", content: "Content of this post"})
        
    //     const instance = new Post();
    //     instance.title = "Thien (edited)"
    //     instance.content = "Content (edited)"
    //     await instance.save();
    // } catch(e) {
    //     console.log('Error 2', e);
    // }
}

async function schema() {
    console.log("Get Schema", Post.schema)
}

schema()