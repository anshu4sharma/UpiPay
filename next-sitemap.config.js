const siteUrl = "https://upipay.anshusharma.me"

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    additionalSitemaps: [
        `${siteUrl}/sitemap.xml`,
        `${siteUrl}/sitemap-0.xml`,
        `${siteUrl}/server-sitemap.xml`,
    ]
}