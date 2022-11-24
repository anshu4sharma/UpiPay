const siteUrl = "https://upipay.ml"

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    additionalSitemaps: [
        `${siteUrl}/sitemap.xml`,
        `${siteUrl}/sitemap-0.xml`,
        `${siteUrl}/server-sitemap.xml`,
    ]
}