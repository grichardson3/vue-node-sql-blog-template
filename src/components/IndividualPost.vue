<template>
    <div class="col-xs-12 col-md-6">
        <h2>{{ title }}</h2>
        <img v-bind:src="featurephoto" v-bind:alt="title" />
        <p>{{ author }}</p>
        <p>{{ content }}</p>
        <p>Tags: {{ tag }}</p>
        <p>Date: {{ date }}</p>
        <p>Views: {{ views }}</p>
    </div>

    <!--v-bind:id="post.post_id"
    v-bind:author="post.post_author"
    v-bind:featurephoto="post.post_featurephoto"
    v-bind:title="post.post_title"
    v-bind:date="post.post_date"
    v-bind:views="post.post_views"
    v-bind:content="post.post_content"
    v-bind:tag="post.post_tag"-->

</template>

<script>

export default {
    props: ['id', 'author', 'content', 'date', 'featurephoto', 'title', 'views', 'tag'],
}

</script>
