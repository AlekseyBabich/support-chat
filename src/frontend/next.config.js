/**
 * @type {import('next').NextConfig}
 **/

const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8081'

const nextConfig = {
  typescript: {
    // next.dir is ./ thus tsconfig.json is two dirs up
    tsconfigPath: '../../tsconfig.json',
  },
}

module.exports = nextConfig
