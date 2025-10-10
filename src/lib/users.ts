import { createClient } from './supabase';
import { User, UpdateUser } from '@/types/database';

export async function getUserProfile(userId: string): Promise<User | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return null;
  }
  return data;
}

export async function updateUserProfile(userId: string, updates: UpdateUser): Promise<User | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function updateUserBalance(userId: string, amount: number): Promise<User | null> {
  const supabase = createClient();
  
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('balance')
    .eq('id', userId)
    .single();

  if (fetchError) throw fetchError;

  const newBalance = (userData.balance || 0) + amount;

  const { data, error } = await supabase
    .from('users')
    .update({ balance: newBalance })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function formatBalance(balance: number): string {
  return new Intl.NumberFormat('fa-IR').format(balance);
}

