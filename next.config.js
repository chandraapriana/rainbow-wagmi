/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "storage.googleapis.com",
      "i.seadn.io",
      "res.cloudinary.com",
      "nft-cdn.alchemy.com",
      "ipfs.io",
      "kometh.mypinata.cloud",
      "gaspack.mypinata.cloud",
      "gateway.pinata.cloud",
      "upload.wikimedia.org",
    ],
    minimumCacheTTL: 1500000,
  },
};

module.exports = nextConfig;
