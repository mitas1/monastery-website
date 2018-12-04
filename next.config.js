module.exports = {
    webpack: function(config) {
        config.module.rules.push({
            test: /\.yaml$/,
            use: {
                loader: "js-yaml-loader",
                options: {
                    safe: false
                }
            }
        });
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader"
                }
            ]
        });
        return config;
    },
    exportPathMap: function() {
        return {
            "/": {
                page: "/",
                query: {
                    lng: "sk"
                }
            },
            "/sk": {
                page: "/",
                query: {
                    lng: "sk"
                }
            },
            "/en": {
                page: "/",
                query: {
                    lng: "en"
                }
            },
            "/collection": {
                page: "/collection",
                query: {
                    lng: "sk"
                }
            },
            "/collection/sk": {
                page: "/collection",
                query: {
                    lng: "sk"
                }
            },
            "/collection/en": {
                page: "/collection",
                query: {
                    lng: "en"
                }
            },
            "/monastery-life": {
                page: "/monastery_life",
                query: {
                    lng: "sk"
                }
            },
            "/monastery-life/sk": {
                page: "/monastery_life",
                query: {
                    lng: "sk"
                }
            },
            "/monastery-life/en": {
                page: "/monastery_life",
                query: {
                    lng: "en"
                }
            }
        };
    }
};
