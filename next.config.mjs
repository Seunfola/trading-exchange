import { config } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React's strict mode for catching potential issues

    webpack: (config) => {
        // Resolve fallback settings for Node.js modules in Webpack
        config.resolve.fallback = {
            ...config.resolve.fallback, // Keep existing fallbacks
            fs: false,
            net: false,
            tls: false,
        };

        // Exclude certain modules from being bundled by Webpack
        config.externals.push("pino-pretty", "lokijs", "encoding");

        return config;
    },

    // Add other configurations as needed
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        INFURA_URL: process.env.INFURA_URL,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        THIRD_PARTY_WALLET_URL: process.env.THIRD_PARTY_WALLET_URL,
    },
};

export default nextConfig;
