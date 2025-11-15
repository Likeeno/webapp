import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'ایمیل و رمز عبور الزامی است' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'رمز عبور باید حداقل ۸ کاراکتر باشد' }, { status: 400 });
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'این ایمیل قبلاً ثبت شده است' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const name = `${firstName} ${lastName}`.trim() || null;
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
        balance: 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'ثبت نام با موفقیت انجام شد',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'خطا در ثبت نام' }, { status: 500 });
  }
}
