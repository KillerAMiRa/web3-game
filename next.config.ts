import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true, // 忽略 eslint 检查
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', // 协议
        hostname: 'eo-img.521799.xyz', // 主机名
        pathname: '/i/pc/**', // 路径
        port: '', // 端口
      },
    ],
    // compilerOptions: {
    //   paths: {
    //     '@/*': ['./src/*'],
    //     '@/public/*': ['./public/*'], // 新增这一行代码，配置图片路径。
    //   },
    // },
  },
}

export default nextConfig
