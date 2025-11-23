"use client";

import {
  Title,
  Text,
  Button,
  Stack,
  Center,
  Container,
  Grid,
  Paper,
} from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <main style={{ minHeight: "80vh", width: "100%", padding: 0 }}>
      {/* Hero chính với ảnh nền */}
      <Center
        style={{
          minHeight: "80vh",
          width: "100%",
          backgroundImage: `url(/background.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Overlay màu tối để chữ nổi bật */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />

        {/* Nội dung Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            maxWidth: "700px",
          }}
        >
          <Title order={2} style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Facebook Automation. Reimagined.
          </Title>

          <Text size="lg" style={{ marginBottom: "2rem", lineHeight: 1.6 }}>
            Scan users, groups, pages and posts instantly. Automate data
            collection and scale your Facebook marketing with ease.
          </Text>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              component={Link}
              href="/register"
              size="lg"
              radius={50}
              style={{
                background: "linear-gradient(90deg, #FF4D5A, #B721FF)",
                color: "#fff",
                fontWeight: 600,
                padding: "12px 26px",
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
              Sign up for a free trial
            </Button>
          </motion.div>
        </motion.div>
      </Center>
    </main>
  );
}
