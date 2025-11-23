"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Card,
  Stack,
  Group,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./RegisterPage.module.css"; // <--- IMPORT CSS MODULE

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

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
        <Card padding="xl" className={styles.registerCard}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <img src="/scapbot-favicon.webp" height="50" />
            <div className={styles.logoTitle}>
              Create Account Facebook Socialking
            </div>
          </div>

          <Stack gap="sm">
            <TextInput
              label={
                <span>
                  Username <span style={{ color: "red" }}>*</span>
                </span>
              }
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              error={!username && error ? "Please enter username" : undefined}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
              radius={50}
            />

            <TextInput
              label="Email *"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
              radius={50}
            />

            <TextInput
              label="Phone"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
              radius={50}
            />

            <PasswordInput
              label="Password *"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
              radius={50}
            />

            <PasswordInput
              label="Confirm password *"
              placeholder="••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
              radius={50}
            />

            <div className={styles.formRow}>
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.currentTarget.checked)}
                classNames={{
                  label: styles.checkboxLabel,
                  input: styles.checkboxInput,
                  icon: styles.checkboxIcon,
                }}
              />
              <Text className={styles.checkboxText}>
                I agree to the{" "}
                <span
                  className={styles.link}
                  onClick={() => router.push("/terms")}
                >
                  terms
                </span>{" "}
                *
              </Text>
            </div>

            <Button fullWidth radius={50} className={styles.primaryButton}>
              Sign up
            </Button>

            <Group justify="center" mt="sm">
              <Text style={{ color: "#fff" }}>
                Already have an account?
                <span
                  onClick={() => router.push("/login")}
                  className={styles.link}
                >
                  {" "}
                  Sign in now
                </span>
              </Text>
            </Group>
          </Stack>
        </Card>
      </div>
    </div>
  );
}
