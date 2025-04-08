/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        config.ignoreWarnings = [
            {
                module: /sequelize/
            },
        ];
        return config;
    }
};

export default nextConfig;
