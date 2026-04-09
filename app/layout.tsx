import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story Isn\'t Over',
  description: 'A romantic and funny apology website for Taran from Jey.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
