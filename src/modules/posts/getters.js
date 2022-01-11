export default {
    posts(state) {
      return state.coaches;
    },
    hasPosts(state) {
      return state.posts && state.posts.length > 0;
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};