const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-next-router',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    typescript: { reactDocgen: false },
    webpackFinal: async (webpackConfig) => {
        // resolve typescript aliases
        webpackConfig.resolve.plugins = [new TsconfigPathsPlugin()];

        const { rules = [] } = webpackConfig.module || {};

        const prevCssRuleIdx = rules.findIndex(
            ({ test }) => test?.toString() === '/\\.css$/'
        );
        const cssRuleIdx =
            prevCssRuleIdx === -1 ? rules.length : prevCssRuleIdx;
        const rulesBefore = rules.slice(0, cssRuleIdx);
        const rulesAfter = rules.slice(cssRuleIdx + 1);

        const cssRule = {
            test: /\.css$/,
            sideEffects: true,
            exclude: /\.module\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        };

        const cssModulesRule = {
            test: /\.css$/,
            include: /\.module\.css$/,
            sideEffects: true,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                },
                'postcss-loader',
            ],
        };

        return {
            ...webpackConfig,
            module: {
                ...webpackConfig.module,
                rules: [...rulesBefore, cssRule, cssModulesRule, ...rulesAfter],
            },
        };
    },
};
