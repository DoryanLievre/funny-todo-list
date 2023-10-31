module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push(
            {
                test: /\.(mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '_next/static/files',
                            outputPath: 'static/files',
                        },
                    },
                ],
            }
        );

        return config;
    },
};
