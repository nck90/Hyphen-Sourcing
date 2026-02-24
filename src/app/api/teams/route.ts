import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId || session.role !== "STUDENT") {
            return NextResponse.json({ error: "Unauthorized. Only students can create teams." }, { status: 403 });
        }

        const body = await req.json();
        const { name, contestId } = body;

        if (!name || !contestId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Generate a random 6-character invite code
        const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const team = await prisma.team.create({
            data: {
                name,
                contestId,
                leaderId: session.userId as string,
                inviteCode,
                members: {
                    create: {
                        userId: session.userId as string
                    }
                }
            },
            include: { members: true }
        });

        return NextResponse.json({ success: true, team }, { status: 201 });
    } catch (error) {
        console.error("Create team error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
