import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId || session.role !== "STUDENT") {
            return NextResponse.json({ error: "Unauthorized. Only students can join teams." }, { status: 403 });
        }

        const body = await req.json();
        const { inviteCode } = body;

        if (!inviteCode) {
            return NextResponse.json({ error: "Missing invite code" }, { status: 400 });
        }

        const team = await prisma.team.findUnique({
            where: { inviteCode }
        });

        if (!team) {
            return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
        }

        // Check if already a member
        const existingMember = await prisma.teamMember.findUnique({
            where: {
                teamId_userId: {
                    teamId: team.id,
                    userId: session.userId as string
                }
            }
        });

        if (existingMember) {
            return NextResponse.json({ error: "Already a member of this team" }, { status: 400 });
        }

        const newMember = await prisma.teamMember.create({
            data: {
                teamId: team.id,
                userId: session.userId as string
            }
        });

        return NextResponse.json({ success: true, teamId: team.id }, { status: 200 });
    } catch (error) {
        console.error("Join team error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
