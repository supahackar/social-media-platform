export const metadata = {
  title: "ClickChat",
  description: "A social media platform",
  icons: {
    icon: "/media/icons/website_favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/global.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
