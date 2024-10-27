/** @type {import('next-sitemap').IConfig} */
const NextSitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  exclude: ["/icon.svg", "/manifest.webmanifest", "/tags/*"],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
}

module.exports = NextSitemapConfig
