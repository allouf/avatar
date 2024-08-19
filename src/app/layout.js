import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IDEA Engine",
  description: "Explore the IDEA Engine, an innovative ecosystem where AI meets wearable crypto collectibles. Unlock new dimensions of digital ownership and creativity.",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html>
      <head>
      <title>{metadata.title}</title>
  <meta name="description" content={metadata.description} />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:description" content={metadata.description} />
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-VTKRRHY6PQ"
  ></script>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VTKRRHY6PQ');
      `,
    }}
  />
      </head>
      <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}