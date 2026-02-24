import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your preferred service
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendVerificationEmail = async (to: string, code: string) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn(`\n[EMAIL MOCK] Verification code for ${to}: ${code}\n`);
        return true;
    }

    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject: '[Hyphensosing] 이메일 인증 코드를 확인해주세요',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #FF5000;">하이픈소싱 이메일 인증</h1>
                <p>안녕하세요, 하이픈소싱에 가입해주셔서 감사합니다.</p>
                <p>아래 6자리 인증 코드를 화면에 입력하여 가입을 완료해주세요.</p>
                <div style="background-color: #F8F9FA; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #222222;">${code}</span>
                </div>
                <p style="color: #999999; font-size: 14px;">이 코드는 10분 후 만료됩니다.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Email send error:", error);
        return false;
    }
};
