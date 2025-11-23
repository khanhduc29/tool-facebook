"use client";

import { Modal, Button, Text, Group } from "@mantine/core";

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title = "Xác nhận",
  message = "Bạn có chắc chắn thực hiện hành động này?",
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} centered title={title}>
      <Text mb="md">{message}</Text>

      <Group justify="flex-end">
        <Button variant="default" onClick={onClose} radius={50}>
          Không
        </Button>
        <Button color="red" onClick={onConfirm} radius={50}>
          Có
        </Button>
      </Group>
    </Modal>
  );
}
