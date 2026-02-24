import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function DELETE() {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Delete user along with cascading relations
        await prisma.user.delete({
            where: { id: session.userId as string }
        });

        // Clear session cookie
        const response = NextResponse.json({ success: true }, { status: 200 });
        response.cookies.delete("session");

        return response;

    } catch (error) {
        console.error("Withdrawal error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
