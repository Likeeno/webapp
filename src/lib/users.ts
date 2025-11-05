import { prisma } from './prisma';
import { User, UpdateUser } from '@/types/database';

export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.name,
      balance: user.balance,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  } catch {
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: UpdateUser): Promise<User | null> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });
    
    return {
      id: user.id,
      name: user.name,
      balance: user.balance,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  } catch {
    throw new Error('Failed to update user profile');
  }
}

export async function updateUserBalance(userId: string, amount: number): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) throw new Error('User not found');

    const newBalance = (user.balance || 0) + amount;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      balance: updatedUser.balance,
      created_at: updatedUser.createdAt.toISOString(),
      updated_at: updatedUser.updatedAt.toISOString(),
    };
  } catch {
    throw new Error('Failed to update user balance');
  }
}

export function formatBalance(balance: number): string {
  return new Intl.NumberFormat('fa-IR').format(balance);
}
