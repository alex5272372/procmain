/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common')
    }
    return config
  }
}
