export default {
    registerPost(state, payload) {
        state.posts.push(payload);
    },
    setPosts(state, payload) {
        state.posts = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
}