import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart AI Automation Complaint Platform',
  description: 'Smart complaint management with AI automation and real-time tracking',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
