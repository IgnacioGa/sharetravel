import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import React from "react";

export const metadata = {
  title: "Travel shares",
  description: "Share adventure and experiences"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
