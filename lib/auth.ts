import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const ALLOWED_EMAILS = [
  'katie.walker@addpeople.co.uk',
  'katie.walker@thrivemediagroup.co.uk',
  'kerry.matthewman@thrivemediagroup.co.uk',
  'chloe.potts@addpeople.co.uk',
  'chloe.potts@thrivemediagroup.co.uk',
  'richard.poskitt@addpeople.co.uk',
  'richard.poskitt@thrivemediagroup.co.uk',
];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/results/login',
    error:  '/results/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
};
