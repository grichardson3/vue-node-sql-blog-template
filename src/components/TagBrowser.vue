<template>
    <div id="tagBrowserArea">
        <h2>Browse By Tag</h2>
        <div id="tagBrowserScroller">
            <button
                id="tagBrowserLeftArrow"
                v-on:click="scrollHandler"
            >&#60;</button>
            <ul id="tagBrowserTagList">
                <div 
                    v-for="tag in tags"
                    v-bind:key="tag.post_tag"
                    v-bind:tag="tag.post_tag"
                >
                    <li v-on:click="toTag(tag)">{{ tag.post_tag }}</li>
                </div>
            </ul>
            <button
                id="tagBrowserRightArrow"
                v-on:click="scrollHandler"
            >&#62;</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tags: []
        }
    },
    methods: {
        scrollHandler(e){
            const scrollEl = document.querySelector("#tagBrowserTagList");
            const eventId = e.target.id;
            if ( eventId === "tagBrowserLeftArrow" ) {
                scrollEl.scrollBy(-200, 0);
            } else if (eventId === "tagBrowserRightArrow") {
                scrollEl.scrollBy(200, 0);
            }
        },
        toTag(tag){
            this.$router.push("/tag/" + `${tag.post_tag}`);
        }
    },
    created(){
        fetch('https://react-node-mysql-blog-template.herokuapp.com/tagsFromPosts')
        .then((response) => {

            // Checks HTTP status code

            if (response.status >= 500) {
                throw new Error("Server error.");
            } else if (response.status < 500 && response.status >= 400) {
                throw new Error("Page error.");
            } else if (response.status < 400) {
                return response.json();
            }
        })
        .then((postTagsData) => {
            // this.setState({ postTags: postTagsData })
            this.tags = postTagsData;
        });
    }
}
</script>
