import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        const contest = await prisma.contest.findUnique({
            where: { id },
            include: {
                client: { select: { name: true, email: true } },
                teams: { include: { members: true } }
            }
        });

        if (!contest) {
            return NextResponse.json({ error: "Contest not found" }, { status: 404 });
        }

        // Increment view count asynchronously
        await prisma.contest.update({
            where: { id },
            data: { views: { increment: 1 } }
        });

        const formattedContest = {
            id: contest.id,
            title: contest.title,
            description: contest.description,
            client: contest.client.name,
            prize: contest.prize,
            daysLeft: Math.max(0, Math.ceil((new Date(contest.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
            type: contest.type,
            tags: contest.tags.split(",").map((t: string) => t.trim()),
            status: contest.status,
            count: contest.interestedCount || 0,
            views: contest.views + 1,
            urgent: contest.urgent,
            teamCount: contest.teams.length
        };

        return NextResponse.json(formattedContest, { status: 200 });
    } catch (error) {
        console.error("Fetch contest detail error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
