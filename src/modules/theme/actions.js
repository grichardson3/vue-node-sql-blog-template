export default {
    async registerTheme(context, data) {
        const themeData = {
            themeTitle: data.theme_title, // Might need to fetch from URL
            themeFontHeading: data.theme_fontHeading,
            themeFontParagraph: data.theme_fontParagraph,
            themeFontDetails: data.theme_fontDetails,
            themeColorBody: data.theme_colorBody,
            themeColorContainer: data.theme_colorContainer,
            themeColorNavigation: data.theme_colorNavigation,
            themeDarkMode: data.theme_darkMode,
            themeImageSlider: data.theme_imageSlider,
            themeColorGraph: data.theme_colorGraph
        };

        const response = await fetch('https://react-node-mysql-blog-template.herokuapp.com/saveTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(themeData)
        });

        if (!response.ok) {
            // error ...
        }

        context.commit('registerTheme', {
            ...themeData
        });
    },
    async loadTheme(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const response = await fetch(
            'https://react-node-mysql-blog-template.herokuapp.com/theme'
        );
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const theme = {
            themeTitle: responseData[0].theme_title,
            themeFontHeading: responseData[0].theme_fontHeading,
            themeFontParagraph: responseData[0].theme_fontParagraph,
            themeFontDetails: responseData[0].theme_fontDetails,
            themeColorBody: responseData[0].theme_colorBody,
            themeColorContainer: responseData[0].theme_colorContainer,
            themeColorNavigation: responseData[0].theme_colorNavigation,
            themeDarkMode: responseData[0].theme_darkMode,
            themeImageSlider: responseData[0].theme_imageSlider,
            themeColorGraph: responseData[0].theme_colorGraph,
            themePostAmount: responseData[0].theme_postAmount,
            themeUserAmount: responseData[0].theme_userAmount,
        }

        context.commit('setTheme', theme);
        context.commit('setFetchTimestamp');
    }
};