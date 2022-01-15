export default {
    async registerPost(context, data) {
        const postData = {
            postAuthor: data.post_author, // Might need to fetch from URL
            postContent: data.post_content,
            // postDate: data.post_date use moment for this
            postFeaturePhoto: data.post_featurephoto,
            postTag: data.post_tag,
            postTitle: data.post_title,
            postViews: 0
        };

        const response = await fetch('https://react-node-mysql-blog-template.herokuapp.com/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            // error ...
          }

        context.commit('registerPost', {
            ...postData
        });
    },
    async loadPosts(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const response = await fetch(
            'https://react-node-mysql-blog-template.herokuapp.com/posts'
        );
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const posts = [];

        for (const key in responseData) {
            const post = {
                postID: JSON.parse(key) + 1,
                postAuthor: responseData[key].post_author,
                postContent: responseData[key].post_content,
                postDate: responseData[key].post_date,
                postFeaturePhoto: responseData[key].post_featurephoto,
                postDBID: responseData[key].post_id,
                postTag: responseData[key].post_tag,
                postTitle: responseData[key].post_title,
                postViews: responseData[key].post_views
            }
            posts.push(post);
        }

        context.commit('setPosts', posts);
        context.commit('setFetchTimestamp');
    }
};