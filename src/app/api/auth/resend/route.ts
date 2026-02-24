import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/email";

export async function POST() {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        await prisma.user.update({
            where: { id: user.id },
            data: {
                verificationCode,
                verificationExpires
            }
        });

        const sent = await sendVerificationEmail(user.email, verificationCode);

        if (!sent) {
            return NextResponse.json({ error: "메일 발송에 실패했습니다. 다시 시도해주세요." }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
