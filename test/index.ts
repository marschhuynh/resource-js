import { BaseResource, Model, Attribute } from "../dist";

@Model('/post/<string:_id>')
class Post extends BaseResource {

    @Attribute("title", {type: 'string'})
    title: string;

    @Attribute("content", {type: 'string'})
    content: string;

    static meta() {
        return {
            item_url: '/post/<string:_id>',
            list_url: '/post'
        }
    }
}

async function main() {
    try {
        const data = await Post.QUERY({
            meta: {
                page: 2,
                max_results: 3
            }
        });
 
        console.log('Data', data.length);
        if (data[0]) {
            data[0].title = "Thien";
            data[0].save();
        }
        await Post.CREATE({title: "This is a title", content: "Content of this post"})
        
        const instance = new Post();
        instance.title = "Thien (edited)"
        instance.content = "Content (edited)"
        await instance.save();
    } catch(e) {
        console.log('Error 2', e.response.data);
    }
}

main()