export default {
    async registerUser(context, data) {
        const userData = {
            userProfilePic: data.users_profilePic,
            userUsername: data.users_username,
            userFirstname: data.users_firstname,
            userLastname: data.users_lastname,
            userBio: data.users_bio,
            userFacebook: data.users_facebook,
            userTwitter: data.users_twitter,
            userLinkedin: data.users_linkedin,
        };

        const response = await fetch('https://react-node-mysql-blog-template.herokuapp.com/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            // error ...
          }

        context.commit('registerUser', {
            ...userData
        });
    },
    async loadUsers(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const response = await fetch(
            'https://react-node-mysql-blog-template.herokuapp.com/users'
        );
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const users = [];

        for (const key in responseData) {
            const user = {
                userID: key,
                userProfilePic: responseData[key].users_profilepic,
                userEmail: responseData[key].users_email,
                userUsername: responseData[key].users_username,
                userFirstname: responseData[key].users_firstname,
                userLastname: responseData[key].users_lastname,
                userBio: responseData[key].users_bio,
                userFacebook: responseData[key].users_facebook,
                userTwitter: responseData[key].users_twitter,
                userLinkedin: responseData[key].users_linkedin,
                userPostAmount: responseData[key].users_postamount,
                userLevel: responseData[key].users_level,
            }
            users.push(user);
        }

        context.commit('setUsers', users);
        context.commit('setFetchTimestamp');
    }
};