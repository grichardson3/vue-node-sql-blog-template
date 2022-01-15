<template>
    <div id="tagPostsResultString">
        <h2>Search Results for: {{ searchTerm }}</h2>
    </div>
    <div class="row">
        <div
            v-for="post in filteredPosts"
            v-bind:key="post.postID"
            v-bind:id="post.postID"
            v-bind:dbid="post.postDBID"
            v-bind:author="post.postAuthor"
            v-bind:content="post.postContent"
            v-bind:date="post.postDate"
            v-bind:featurephoto="post.postFaturePhoto"
            v-bind:tag="post.postTag"
            v-bind:title="post.postTitle"
            v-bind:views="post.postViews"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
        >
            <div
                class="blogPostFeaturePhoto"
                v-on:click="toPost(post.postID)"
            >
                <img 
                    v-bind:src="post.postFeaturePhoto"
                    v-bind:alt="post.postTitle"
                    v-bind:title="post.postTitle"
                >
            </div>
            <h2 v-on:click="toPost(post.postID)" class="cursor">{{ post.postTitle }}</h2>
            <div class="blogPostMetaArea">
                <div>
                    <span>Author: </span>
                    <span 
                        class="blogPostAuthorLink"
                        v-on:click="toAuthor(post.postAuthor)"
                    >{{ post.postAuthor }}</span>
                </div>
                <span class="blogPostDateText">
                    Date Posted: {{ moment.unix(post.postDate).format("MMM Do, YYYY") }}
                </span>
            </div>
            <p class="blogPostContent">
                {{
                    post.postContent.length > 200 ? 
                    `${post.postContent.substring(0,200)}...` : 
                    post.postContent
                }}
            </p>
            <div class="blogPostBottomMetaArea">
                <span
                    class="blogPostReadMore"
                    v-on:click="toPost(post.postID)"
                >Read More</span>
                <div>
                    <span class="blogPostTagText">Tags: </span>
                    <span 
                        class="blogPostIndividualTagText"
                        v-on:click="toTag(post.postTag)"
                    >
                        {{ post.postTag }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            posts: [],
            filteredPosts: [],
            searchTerm: window.location.href.split("/")[window.location.href.split("/").length - 1]
        }
    },
    created(){
        const promise = new Promise((resolve, reject) => {
            // Retries the promise if the information isn't loaded in fast enough
            const retryPromise = () => {
                setTimeout(() => {
                    if (this.$store.state.posts.posts.length > 0) {
                        resolve('Success');
                    } else if (this.$store.state.posts.posts.length === 0) {
                        retryPromise();
                    } else {
                        reject("Failed.");
                    }
                }, 25);
            }
            if (this.$store.state.posts.posts.length > 0) {
                resolve('Success');
            } else if (this.$store.state.posts.posts.length === 0) {
                retryPromise();
            } else {
                reject("Failed.");
            }
        })
        promise.then(() => {
            this.posts = this.$store.state.posts.posts;
            this.filteredPosts = this.posts.filter((post) => {
                return ( post.postTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) );
            });
        });
    },
    methods: {
        toPost(id){
            this.$router.push(`/post/` + `${id}`);
        },
        toAuthor(author){
            this.$router.push(`/author/` + author);
        },
        toTag(tag){
            this.$router.push(`/tag/` + tag);
        }
    },
    watch: {
        '$route': function () {
            this.searchTerm = window.location.href.split("/")[window.location.href.split("/").length - 1]
            this.filteredPosts = this.posts.filter((post) => {
                return ( post.postTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) );
            });
        }
    }
}
</script>
