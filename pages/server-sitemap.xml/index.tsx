import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await fetch(`https://anshu.up.railway.app/genlink/showall`)
    const links: any[] = await res.json()
    const fields: ISitemapField[] = links.map(link => ({ loc: `https://upipay.anshusharma.me/pay/${link.uid}`, lastmod: new Date().toISOString() }))
    return getServerSideSitemap(ctx, fields)
}

export default function Site() { }