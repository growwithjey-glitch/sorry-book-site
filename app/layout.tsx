import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jey & Taran — Our Story Isn\'t Over',
  description: 'A cinematic, romantic, funny apology storybook for Taran from Jey.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
