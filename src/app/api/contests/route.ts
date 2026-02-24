import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const type = url.searchParams.get("type");
        const status = url.searchParams.get("status");

        const whereClause: any = {};
        if (type && type !== "전체보기") whereClause.type = type;
        if (status) whereClause.status = status;

        const contests = await prisma.contest.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: {
                client: { select: { name: true } }
            }
        });

        // Map to expected UI format
        const formattedContests = contests.map((c: any) => ({
            id: c.id,
            title: c.title,
            client: c.client.name,
            prize: c.prize,
            daysLeft: Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
            type: c.type,
            tags: c.tags.split(",").map((t: string) => t.trim()),
            status: c.status,
            count: c.interestedCount || 0,
            urgent: c.urgent
        }));

        return NextResponse.json(formattedContests, { status: 200 });
    } catch (error) {
        console.error("Fetch contests error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId || session.role !== "CLIENT") {
            return NextResponse.json({ error: "Unauthorized. Only clients can create contests." }, { status: 403 });
        }

        const body = await req.json();
        const { title, description, prize, type, deadline } = body;

        const contest = await prisma.contest.create({
            data: {
                title,
                description,
                prize,
                type,
                tags: "New",
                deadline: new Date(deadline),
                clientId: session.userId as string,
                status: "접수중"
            }
        });

        return NextResponse.json({ success: true, contest }, { status: 201 });
    } catch (error) {
        console.error("Create contest error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
