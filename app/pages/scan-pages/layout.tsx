"use client";

import { Tabs } from "@mantine/core";
import { JobConfig } from "@/app/services/job.config";
import styles from "../../components/form/TaskForm.module.css";
import { useState } from "react";
import TaskForm from "@/app/components/form/TaskForm";

export default function ScanPostsLayout({ children }: { children: React.ReactNode }) {
  const parentKey = "scan_pages"; // nhóm có action
  const actions = JobConfig[parentKey].actions!;
  const [activeTab, setActiveTab] = useState(actions[0].service);

  return (
    <div className={styles.scanLayout}>
      
      {/* ---- HEADER Tabs ---- */}
      <Tabs
        value={activeTab}
        onChange={(v) => v && setActiveTab(v)}
        className={styles.actionTabs}
      >
        <Tabs.List className={styles.tabList}>
          {actions.map((action) => (
            <Tabs.Tab
              key={action.key}
              value={action.service}
              className={styles.tabButton}
            >
              {action.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      {/* ---- CONTENT AREA ---- */}
      {/* <div className={styles.contentArea}>{children}</div> */}
      <div className={styles.contentArea}>
        <TaskForm serviceName={activeTab as keyof typeof JobConfig} />
      </div>
    </div>
  );
}
