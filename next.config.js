const withPWA = require("next-pwa");

const nextConfig = {
  pwa: {
    dest: "public",
  },
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer, dev }) => {
    config.output.chunkFilename = isServer
      ? `${dev ? "[name]" : "[name].[fullhash]"}.js`
      : `static/chunks/${dev ? "[name]" : "[name].[fullhash]"}.js`;

    return config;
  },
}

module.exports = withPWA(nextConfig);
