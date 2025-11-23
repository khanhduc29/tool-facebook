"use client";

import { useState, useEffect } from "react";
import { AppShell, Burger } from "@mantine/core";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import Navbar from "../components/Navbar";
import { useMediaQuery } from "@mantine/hooks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  const [opened, setOpened] = useState(!isMobile);

  // Ensure sidebar collapses automatically only on mobile change
  useEffect(() => {
    setOpened(!isMobile);
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "#0A0A14",
          }}
        >
          <Navbar />
          <div style={{ marginTop: "1rem", padding: "1rem" }}>{children}</div>
        </div>
      ) : (
        <AppShell
          layout="alt"
          navbar={{
            width: opened ? 240 : 70,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
          styles={{
            main: {
              background: "#0A0A14",
              color: "white",
              minHeight: "100vh",
            },
          }}
        >
          {/* SIDEBAR */}
          <AppShell.Navbar
            p="md"
            style={{
              width: opened ? 240 : 70,
              background: "#0A0A14",
              borderRight: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Burger Button */}
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: opened ? "flex-end" : "center",
              }}
            >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="#B721FF"
                style={{
                  transition: "0.25s",
                }}
              />
            </div>

            <Sidebar collapsed={!opened} />
          </AppShell.Navbar>

          {/* MAIN CONTENT */}
          <AppShell.Main>
            <Topbar />
            <div style={{ marginTop: "1rem", padding: "0 1rem" }}>{children}</div>
          </AppShell.Main>
        </AppShell>
      )}
    </>
  );
}
