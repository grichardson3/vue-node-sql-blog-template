export default {
    registerTheme(state, payload) {
        state.theme.push(payload);
    },
    setTheme(state, payload) {
        state.theme = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
}