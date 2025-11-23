"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Stack,
  Group,
  Text,
  Checkbox,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleLogin = () => {
    router.push("/pages/scan-users");
  }

  return (
    <div className={styles.pageWrapper}>
      {!isSmallScreen && (
        <div style={{ width: "60%", overflow: "hidden" }}>
          <img
            src="/background.jpg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <div
        style={{
          width: isSmallScreen ? "100%" : "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card padding="xl" className={styles.loginCard}>
          {/* Logo + title */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <img
              src="/scapbot-favicon.png"
              alt="Logo"
              style={{ height: 50, margin: "0 auto 8px" }}
            />
            <div className={styles.logoTitle}>Facebook SocialKing</div>
          </div>

          <Stack gap="sm">
            <TextInput
              label="Username or email"
              radius={50}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
            />

            <PasswordInput
              label="Password"
              radius={50}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
            />

            <Group className={styles.formRow}>
              <Checkbox
                label="Remember me"
                checked={remember}
                onChange={(e) => setRemember(e.currentTarget.checked)}
                classNames={{
                  label: styles.checkboxLabel,
                  input: styles.checkboxInput,
                  icon: styles.checkboxIcon,
                }}
              />

              <Text
                className={styles.gradientLink}
                size="sm"
                onClick={() => router.push("/forgot-password")}
                style={{ cursor: "pointer" }}
              >
                Forgot your password?
              </Text>
            </Group>

            <Button fullWidth radius={50} className={styles.primaryButton} onClick={handleLogin}>
              Sign in
            </Button>

            <Button fullWidth radius={50} className={styles.googleButton}>
              Sign in with Google
            </Button>

            <Group justify="center" mt="sm">
              <Text  style={{ color: "#fff" }}>
                Don't have an account?{" "}
                <span
                  onClick={() => router.push("/register")}
                  className={styles.gradientLink}
                >
                  Sign up
                </span>
              </Text>
            </Group>
          </Stack>
        </Card>
      </div>
    </div>
  );
}
