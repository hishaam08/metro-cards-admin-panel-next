/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_LOCAL_URI:
      "mongodb+srv://Hishaam:hishaam%40mongodb@nodeprojects.fwck6dz.mongodb.net/METRO-CARDS?retryWrites=true&w=majority",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
