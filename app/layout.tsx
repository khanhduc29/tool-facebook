"use client";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
// import { store } from "./store/store"; 
import "./globals.css";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <MantineProvider >
            <Notifications position="top-right" />
            {children}
          </MantineProvider>

    
      </body>
    </html>
  );
}
