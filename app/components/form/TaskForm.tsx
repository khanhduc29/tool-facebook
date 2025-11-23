"use client";

import { Button, TextInput, Group, Alert, Switch, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { JobConfig } from "@/app/services/job.config";
import taskService from "../../services/task.service";
import styles from "./TaskForm.module.css";

export default function TaskForm({
  serviceName,
}: {
  serviceName: keyof typeof JobConfig;
}) {
  const config = JobConfig[serviceName];
  const [task, setTask] = useState<any>(null);
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    taskService.getLatest(serviceName).then(setTask);
  }, []);

  const disabled = task && task.status !== "completed";

  const handleSubmit = async () => {
    const created = await taskService.create({
      jobs: { service_name: serviceName, variables: values },
    });

    setTask(created);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* LEFT SIDE: RESULT */}
      <div className={styles.resultBox}>
        {!task ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📄</span>
            <p>Chưa có dữ liệu để hiển thị</p>
            <small>Bấm “Bắt đầu quét” để tạo yêu cầu</small>
          </div>
        ) : (
          <div className={styles.resultContent}>
            <h3>Kết quả quét</h3>
            <pre>
              {JSON.stringify(task?.result ?? "Đang xử lý...", null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className={styles.formContainer}>
        <h2 className={styles.title}>{config.label}</h2>

        {task && task.status !== "completed" && (
          <Alert color="yellow" mb="md" w="100%">
            ⏳ Yêu cầu đang xử lý: <b>{task.status}</b>
          </Alert>
        )}

        {config.fields?.map((field) => {
          // --- SELECT FIELD ---
          if (field.type === "select") {
            return (
              <div key={field.name} className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>{field.label}</label>

                <Select
                  data={field.options ?? []}
                  placeholder="Chọn một mục"
                  disabled={disabled}
                  classNames={{
                    input: styles.customSelectInput,
                    dropdown: styles.customSelectDropdown,
                    option: styles.optionItem,
                  }}
                  onChange={(value) =>
                    setValues({ ...values, [field.name]: value })
                  }
                />
              </div>
            );
          }

          // --- SWITCH ---
          if (
            field.name.startsWith("is_") ||
            field.name.includes("near") ||
            field.name.includes("group") ||
            field.name.includes("public_only") ||
            field.name.includes("exclude_seen")
          )
            return (
              <div key={field.name} className={styles.switchRow}>
                <Switch
                  label={field.label}
                  disabled={disabled}
                  checked={values[field.name] ?? false}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [field.name]: e.currentTarget.checked,
                    })
                  }
                  classNames={{
                    label: styles.switchLabel,
                    track: styles.switchTrack,
                    thumb: styles.switchThumb,
                  }}
                />
              </div>
            );

          // --- TEXTAREA FIELDS ---
          if (["keyword", "related_keywords"].includes(field.name)) {
            return (
              <div key={field.name} className={styles.fieldWrapper}>
                <p className={styles.fieldLabel}>{field.label}</p>
                <textarea
                  placeholder={field.placeholder ?? ""}
                  disabled={disabled}
                  className={styles.textAreaField}
                  onChange={(e) =>
                    setValues({ ...values, [field.name]: e.target.value })
                  }
                />
              </div>
            );
          }

          // --- DEFAULT INPUT ---
          return (
            <TextInput
              key={field.name}
              label={field.label}
              placeholder={field.placeholder ?? ""}
              required={field.required}
              disabled={disabled}
              classNames={{
                label: styles.labelGradient,
                input: styles.inputField,
              }}
              onChange={(e) =>
                setValues({ ...values, [field.name]: e.target.value })
              }
              mt="md"
            />
          );
        })}

        <Group mt="xl">
          {task?.status === "completed" ? (
            <Button radius={50} className={styles.primaryButton}>
              📁 Tải báo cáo
            </Button>
          ) : (
            <Button
              radius={50}
              className={styles.primaryButton}
              onClick={handleSubmit}
              disabled={disabled}
            >
              🚀 Bắt đầu quét
            </Button>
          )}
        </Group>
      </div>
    </div>
  );
}
