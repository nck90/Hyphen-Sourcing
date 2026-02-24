import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId || session.role !== "STUDENT") {
            return NextResponse.json({ error: "Unauthorized. Only students can apply to contests." }, { status: 403 });
        }

        const body = await req.json();
        const { contestId, teamId, isIndividual } = body;

        if (!contestId) {
            return NextResponse.json({ error: "Missing contestId" }, { status: 400 });
        }

        // Validate that user is not already applied individually OR as part of the given team
        let applicationData: any = { contestId };

        if (isIndividual) {
            // Create a solo team for the individual
            const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            const soloTeam = await prisma.team.create({
                data: {
                    name: "개인 참가자", // "Individual Participant"
                    contestId,
                    leaderId: session.userId as string,
                    inviteCode,
                    members: {
                        create: {
                            userId: session.userId as string
                        }
                    }
                }
            });
            applicationData.teamId = soloTeam.id;
        } else {
            if (!teamId) {
                return NextResponse.json({ error: "teamId is required for team applications" }, { status: 400 });
            }
            // Check if team exists and user is a member or leader
            const team = await prisma.team.findUnique({
                where: { id: teamId },
                include: { members: true }
            });

            if (!team) {
                return NextResponse.json({ error: "Team not found" }, { status: 404 });
            }

            const isMember = team.members.some(m => m.userId === session.userId);
            if (!isMember) {
                return NextResponse.json({ error: "You are not a member of this team" }, { status: 403 });
            }

            // Check if team already applied
            const existing = await prisma.application.findUnique({
                where: { teamId }
            });

            if (existing) {
                return NextResponse.json({ error: "Your team has already applied to this contest." }, { status: 400 });
            }
            applicationData.teamId = teamId;
        }

        // Create application
        const application = await prisma.application.create({
            data: applicationData
        });

        // Increment interestedCount and views on contest silently
        await prisma.contest.update({
            where: { id: contestId },
            data: { interestedCount: { increment: 1 } }
        });

        return NextResponse.json({ success: true, application }, { status: 201 });
    } catch (error) {
        console.error("Apply contest error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
