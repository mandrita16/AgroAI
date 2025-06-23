import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgroAI',
  description: 'A custom application built with Next.js',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
