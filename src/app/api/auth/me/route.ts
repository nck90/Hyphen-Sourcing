import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getSession();

        if (!session || !session.userId) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId as string },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                univ: true,
                bio: true,
                phone: true,
                jobRole: true,
                portfolioUrl: true,
                verified: true
            }
        });

        if (!user) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({ authenticated: true, user }, { status: 200 });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
