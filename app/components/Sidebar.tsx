"use client";

import Link from "next/link";
import { Stack, Group, Text, Image, Tooltip, UnstyledButton } from "@mantine/core";
import { usePathname } from "next/navigation";
import {
  IconBook2,
  IconHelpCircle,
  IconHeadphones,
  IconUsersGroup,
  IconUserSearch,
  IconBrandMeta,
  IconFileSearch,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo } from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  collapsed?: boolean;
}

interface MenuItemProps {
  item: { label: string; icon: any; href: string };
  collapsed: boolean;
  isActive: boolean;
}

function MenuItem({ item, collapsed, isActive }: MenuItemProps) {
  const IconComponent = item.icon;

  const content = (
    <UnstyledButton
      component={Link}
      href={item.href}
      className={`${styles.item} ${isActive ? styles.active : ""}`}
    >
      <IconComponent size={22} color={isActive ? "#B721FF" : "#ccc"} />

      {!collapsed && (
        <Text className={isActive ? styles.label : ""}>
          {item.label}
        </Text>
      )}
    </UnstyledButton>
  );

  return collapsed ? <Tooltip label={item.label}>{content}</Tooltip> : content;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const mainMenu = useMemo(
    () => [
      { label: "Scan Users", icon: IconUserSearch, href: "/pages/scan-users" },
      { label: "Scan Groups", icon: IconUsersGroup, href: "/pages/scan-groups" },
      { label: "Scan Pages", icon: IconBrandMeta, href: "/pages/scan-pages" },
      { label: "Scan Posts", icon: IconFileSearch, href: "/pages/scan-posts" },
    ],
    []
  );

  const bottomMenu = [
    { label: "User manual", icon: IconBook2, href: "#" },
    { label: "Questions", icon: IconHelpCircle, href: "#" },
    { label: "Online Support", icon: IconHeadphones, href: "#" },
  ];

  return (
    <Stack className={styles.sidebar} justify="space-between" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Stack gap="sm">
        {mainMenu.map((item) => (
          <MenuItem
            key={item.label}
            item={item}
            collapsed={collapsed}
            isActive={pathname === item.href}
          />
        ))}
      </Stack>

      <Stack gap="sm" style={{ marginTop: "auto" }}>
        {bottomMenu.map((item) => (
          <MenuItem
            key={item.label}
            item={item}
            collapsed={collapsed}
            isActive={pathname === item.href}
          />
        ))}

        <span className={styles.buildTag}>build.6.5.4</span>
      </Stack>

    </Stack>
  );
}
