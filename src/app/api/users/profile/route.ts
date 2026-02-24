import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { bio, jobRole, portfolioUrl } = body;

        const updatedUser = await prisma.user.update({
            where: { id: session.userId as string },
            data: {
                bio: bio !== undefined ? bio : undefined,
                jobRole: jobRole !== undefined ? jobRole : undefined,
                portfolioUrl: portfolioUrl !== undefined ? portfolioUrl : undefined,
            }
        });

        return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
