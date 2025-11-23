"use client";

import {
  Group,
  Tooltip,
  UnstyledButton,
  Menu,
  Avatar,
  Button,
} from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";

import {
  IconUsers,
  IconRobot,
  IconMessages,
  IconUserCog,
  IconUsersGroup,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import { useState } from "react";
import ConfirmModal from "./ConfirmModel";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: IconLayoutDashboard, href: "/pages/dashboard" },
    { label: "Tài Khoản Zalo", icon: IconUsers, href: "/pages/accounts" },
    { label: "Tương Tác nhanh", icon: IconRobot, href: "/pages/workplace" },
    { label: "Quản Lý Tin Nhắn", icon: IconMessages, href: "/pages/messages" },
    { label: "Quản Lý Bạn bè", icon: IconUserCog, href: "/pages/friends" },
    { label: "Quản Lý Nhóm", icon: IconUsersGroup, href: "/pages/groups" },
  ];

  const handleNavigate = (href: string) => router.push(href);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser") || "null")
      : null;

  if (!isMobile) return null;

  const handleLogoutConfirm = () => {
    console.log("log out")
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 60,
        background: "#fff",
        borderBottom: "1px solid #e9ecef",
        padding: "0 8px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <ConfirmModal
        opened={confirmLogoutOpen}
        onClose={() => setConfirmLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất không?"
      />
      {/* Menu icons */}
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Tooltip
            key={item.label}
            label={item.label}
            position="bottom"
            withArrow
          >
            <UnstyledButton
              onClick={() => handleNavigate(item.href)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 6,
                borderRadius: 8,
                backgroundColor: isActive
                  ? "rgba(0,123,255,0.1)"
                  : "transparent",
              }}
            >
              <item.icon size={24} color={isActive ? "#007bff" : undefined} />
            </UnstyledButton>
          </Tooltip>
        );
      })}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Nút Mua Gói */}
      <Button
        color="blue"
        size="xs"
        radius={50}
        style={{ marginRight: 8 }}
        onClick={() => setOpened(true)}
      >
        Mua Gói
      </Button>

      {/* Avatar + Dropdown */}
      {user && (
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Avatar
              src={user.avatarhref}
              alt={user.name}
              radius="xl"
              size={32}
              style={{ cursor: "pointer" }}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{user.name}</Menu.Label>
            <Menu.Item onClick={() => router.push("/pages/profile")}>
              Hồ sơ cá nhân
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/pages/settings")}>
              Cài đặt
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" onClick={() => setConfirmLogoutOpen(true)}>
              Đăng xuất
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </div>
  );
}
