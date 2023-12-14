import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LLama Trainer",
  description: "Some old questions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto">
          <div className="navbar bg-base-100 border-solid border-b-2 pb-0 mb-8 ">
            <div className="flex items-baseline prose w-full divide-x">
              <h1 className="text-xl px-2">LLama Trainer</h1>
              <p className="px-2">Historical LearnedLeague questions</p>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
