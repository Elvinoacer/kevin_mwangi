import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

export async function GET() {
  return NextResponse.json({
    name: profile.fullName,
    role: profile.role,
    location: profile.location,
    availability: profile.availability,
  });
}
