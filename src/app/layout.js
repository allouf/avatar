import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IDEA Engine: AI - wearable crypto collectibles ecosystem",
  description: "Explore the IDEA Engine, an innovative ecosystem where AI meets wearable crypto collectibles. Unlock new dimensions of digital ownership and creativity.",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VTKRRHY6PQ"></script>
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