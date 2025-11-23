"use client";

import {
  Group,
  Button,
  ActionIcon,
  Badge,
  Menu,
  Avatar,
  Flex,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Topbar.module.css";

export default function Topbar() {
  const router = useRouter();
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  return (
    <Flex className={styles.topbar}>
      {/* Left Section */}
      <span className={styles.proBadge}>Pro</span>
        
      

      {/* Right Section */}
      <Group gap="xs">
        

        <Button radius={50} className={styles.primaryButton}>
          Mua gói
        </Button>

        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Avatar
              src={""}
              alt="User"
              radius="xl"
              size={38}
              style={{ cursor: "pointer" }}
            />
          </Menu.Target>

          <Menu.Dropdown className={styles.menuDropdown}>
            <Menu.Item
              className={styles.menuItem}
              onClick={() => router.push("/pages/profile")}
            >
              Hồ sơ cá nhân
            </Menu.Item>
            <Menu.Item
              className={styles.menuItem}
              onClick={() => router.push("/pages/settings")}
            >
              Cài đặt
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              className={styles.logout}
              // onClick={() => setConfirmLogoutOpen(true)}
              onClick={() => router.replace("/login")}
            >
              Đăng xuất
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
}
