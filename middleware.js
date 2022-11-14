import { NextResponse } from "next/server";

export default async function middleware(req) {
  let cookie = req.cookies.get("token");
  let url = req.url;
  if (!cookie && url.includes("/dashboard")) {
    try {
      return NextResponse.redirect("http://localhost:3000/login");
    } catch (error) {
      return NextResponse.next();
    }
  }
  console.log(cookie && url.includes('/login'));

  if (cookie && url.includes('/login')) {
    try {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    } catch (error) {
      return NextResponse.next();
    }
  }
  if (cookie && url.includes('/signup')) {
    try {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    } catch (error) {
      return NextResponse.next();
    }
  }

}
