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
                    loader: "frontmatter-markdown-loader"
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
            "/offerings": {
                page: "/offerings",
                query: {
                    lng: "sk"
                }
            },
            "/offerings/sk": {
                page: "/offerings",
                query: {
                    lng: "sk"
                }
            },
            "/offerings/en": {
                page: "/offerings",
                query: {
                    lng: "en"
                }
            },
            "/contact": {
                page: "/contact",
                query: {
                    lng: "sk"
                }
            },
            "/contact/sk": {
                page: "/contact",
                query: {
                    lng: "sk"
                }
            },
            "/contact/en": {
                page: "/contact",
                query: {
                    lng: "en"
                }
            },
            "/monasterylife": {
                page: "/monasterylife",
                query: {
                    lng: "sk"
                }
            },
            "/monasterylife/sk": {
                page: "/monasterylife",
                query: {
                    lng: "sk"
                }
            },
            "/monasterylife/en": {
                page: "/monasterylife",
                query: {
                    lng: "en"
                }
            },
            "/guests": {
                page: "/guests",
                query: {
                    lng: "sk"
                }
            },
            "/guests/sk": {
                page: "/guests",
                query: {
                    lng: "sk"
                }
            },
            "/guests/en": {
                page: "/guests",
                query: {
                    lng: "en"
                }
            },
            "/experiences": {
                page: "/experiences",
                query: {
                    lng: "sk"
                }
            },
            "/experiences/sk": {
                page: "/experiences",
                query: {
                    lng: "sk"
                }
            },
            "/experiences/en": {
                page: "/experiences",
                query: {
                    lng: "en"
                }
            }
        };
    }
};
