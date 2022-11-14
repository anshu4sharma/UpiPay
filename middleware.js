import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = false;
  let cookie = req.cookies.get("token");
  console.log(cookie);
  let url = req.url;
  if (!verify && url.includes("/dashboardsss")) {
    return NextResponse.redirect("http://localhost:3000");
  }
}
