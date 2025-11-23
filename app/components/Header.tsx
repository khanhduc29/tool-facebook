"use client";

import Link from "next/link";
import {
  Group,
  Button,
  Container,
  Flex,
  Text,
  Anchor,
  UnstyledButton,
} from "@mantine/core";
import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        height: 80,
        background: `
        radial-gradient(circle at 50% 0%, rgba(109,46,195,0.25), transparent 60%),
        linear-gradient(90deg, rgba(255,60,150,0.08), rgba(109,46,195,0.08)),
        #0A0A14
        `,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 999,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.45)",
      }}
    >
      <Container size="lg" style={{ height: "100%" }}>
        <Flex align="center" justify="space-between" h="100%">
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <Image
              src="/scapbot-favicon.png"
              alt="SCAPBOT Logo"
              width={40}
              height={40}
              priority
              style={{
                objectFit: "contain",
                width: "fit-content",
                height: "auto",
              }}
            />

            <Text
              fw={700}
              fz="xl"
              style={{ color: "#E8E5FF", letterSpacing: "2px" }}
            >
              SCAPBOT
            </Text>
          </Link>

          {/* Menu */}
          <Group justify="md" align="center" >
            {["features", "pricing", "contact"].map((section) => (
              <Anchor
                style={{
                  textDecoration: "none",
                  color: "#C9C7F5",
                  fontWeight: 500,
                  padding: "6px 10px",
                  transition: "0.3s",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(200,70,255,0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Anchor>
            ))}

            <Button
              component={Link}
              href="/login"
              size="sm"
              radius={50}
              style={{
                background: "linear-gradient(90deg, #FF4D5A, #B721FF)",
                color: "#fff",
                fontWeight: 600,
                transition: "all 0.25s ease",
                boxShadow: "0 0 18px rgba(183, 33, 255, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(183, 33, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 0 18px rgba(183, 33, 255, 0.25)";
              }}
            >
              Login / Register
            </Button>
          </Group>
        </Flex>
      </Container>

      <style jsx>{`
        a:hover span {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
