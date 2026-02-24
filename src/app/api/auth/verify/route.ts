import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { code } = body;

        if (!code) {
            return NextResponse.json({ error: "코드 입력이 필요합니다." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId as string }
        });

        if (!user) {
            return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
        }

        if (user.verified) {
            return NextResponse.json({ error: "이미 인증된 사용자입니다." }, { status: 400 });
        }

        if (user.verificationCode !== code) {
            return NextResponse.json({ error: "유효하지 않은 인증 코드입니다." }, { status: 400 });
        }

        if (user.verificationExpires && new Date() > new Date(user.verificationExpires)) {
            return NextResponse.json({ error: "인증 코드가 만료되었습니다. 다시 요청해주세요." }, { status: 400 });
        }

        // Verify user
        await prisma.user.update({
            where: { id: user.id },
            data: {
                verified: true,
                verificationCode: null,
                verificationExpires: null
            }
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
