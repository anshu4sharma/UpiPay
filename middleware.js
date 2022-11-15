import { NextResponse } from "next/server";

export default async function middleware(req) {
  let cookie = req.cookies.get("token");
  let url = req.url;
  if (!cookie && url.includes("/genlink")) {
    try {
      // return NextResponse.redirect("http://localhost:3000/login");
      return NextResponse.redirect("https://upipayy.vercel.app/login");
    } catch (error) {
      return NextResponse.next();
    }
  }
  if (cookie && url.includes('/login')) {
    try {
      // return NextResponse.redirect("http://localhost:3000/genlink");
      return NextResponse.redirect("https://upipayy.vercel.app/genlink");
    } catch (error) {
      return NextResponse.next();
    }
  }
  if (cookie && url.includes('/signup')) {
    try {
      return NextResponse.redirect("https://upipayy.vercel.app/genlink");
      // return NextResponse.redirect("http://localhost:3000/genlink");
    } catch (error) {
      return NextResponse.next();
    }
  }

}
