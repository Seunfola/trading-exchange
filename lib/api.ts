import prisma from './prisma';
import bcrypt from 'bcryptjs';

export const signup = async (username: string, email: string, password: string) => {
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ');
  }
};


export const fetchPairs = async () => {
  const response = await fetch('/api/tradingPairs');
  return await response.json();
};

export const fetchOrderBook = async () => {
  const response = await fetch('/api/orderBook');
  return await response.json();
};

export const fetchCandlestickData = async () => {
  const response = await fetch('/api/candlestick');
  return await response.json();
};

export const fetchMarketData = async () => {
  const response = await fetch('/api/markets');
  return await response.json();
};

export const fetchLogin= async () => {
  const response = await fetch('/api/login');
  return await response.json();
};

export const fetchCSign = async () => {
  const response = await fetch('/api/candlestick');
  return await response.json();
};