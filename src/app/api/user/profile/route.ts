import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غیر مجاز - لطفاً وارد شوید' },
        { status: 401 }
      );
    }

    // Get user profile
    const profile = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'خطا در دریافت اطلاعات کاربر' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: profile.id,
      name: profile.name,
      balance: profile.balance,
      email: profile.email,
      created_at: profile.createdAt.toISOString(),
      updated_at: profile.updatedAt.toISOString(),
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'خطا در پردازش درخواست' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غیر مجاز - لطفاً وارد شوید' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'نام الزامی است' },
        { status: 400 }
      );
    }

    // Update user profile
    const profile = await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() },
    });

    return NextResponse.json({
      id: profile.id,
      name: profile.name,
      balance: profile.balance,
      email: profile.email,
      created_at: profile.createdAt.toISOString(),
      updated_at: profile.updatedAt.toISOString(),
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'خطا در به‌روزرسانی اطلاعات' },
      { status: 500 }
    );
  }
}
