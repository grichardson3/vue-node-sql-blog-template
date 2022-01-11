export default {
    registerUser(state, payload) {
        state.users.push(payload);
    },
    setUsers(state, payload) {
        state.users = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
}