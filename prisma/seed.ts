import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Clearing database...')
    await prisma.application.deleteMany()
    await prisma.teamMember.deleteMany()
    await prisma.team.deleteMany()
    await prisma.contest.deleteMany()
    await prisma.user.deleteMany()

    console.log('Seeding initial data...')

    // 1. Create a dummy client and a student
    const clientUser = await prisma.user.create({
        data: {
            email: 'client@greenfarm.co.kr',
            name: '그린팜 대표',
            password: '$2a$10$abcdefghijklmnopqrstuv', // Dummy hash
            role: 'CLIENT',
            verified: true,
        }
    })

    const studentUser = await prisma.user.create({
        data: {
            email: 'student@univ.ac.kr',
            name: '김학생',
            password: '$2a$10$abcdefghijklmnopqrstuv', // Dummy hash
            role: 'STUDENT',
            verified: true,
        },
    })

    // 2. Create the exact Contests from Loud.kr clone
    const d12Contest = await prisma.contest.create({
        data: {
            title: '지역 특산물 커머스 B2B 관리자 대시보드 기획/프론트 개발',
            description: '농산물 직거래 플랫폼을 운영 중인 그린팜입니다. 판매자용 대시보드 완제품(프론트엔드)이 필요합니다.',
            prize: '2500000',
            type: '웹/앱 개발',
            tags: 'React,대시보드',
            deadline: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
            status: '접수중',
            urgent: false,
            clientId: clientUser.id
        }
    })

    await prisma.contest.create({
        data: {
            title: '오프라인 매장용 AI 기반 재고관리 앱 데모 (iOS)',
            description: '리테일 매장을 위한 iOS 데모 앱 구축.',
            prize: '1200000',
            type: '모바일 앱',
            tags: 'iOS,Swift',
            deadline: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000), // 6 days
            status: 'OPEN',
            urgent: false,
            clientId: clientUser.id
        }
    })

    await prisma.contest.create({
        data: {
            title: '사업자용 자동 회계분석 로직 구축 (FastAPI 지원 필수)',
            description: '영수증 자동 처리 백엔드 로직.',
            prize: '3850000',
            type: 'AI/빅데이터',
            tags: 'Python',
            deadline: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days
            status: 'OPEN',
            urgent: true,
            clientId: clientUser.id
        }
    })

    console.log('Seed completed successfully.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
