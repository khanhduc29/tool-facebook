"use client";

import React, { useRef, useState } from "react";
import { notifications } from "@mantine/notifications";

interface ChatFormData {
  name: string;
  email: string;
  message: string;
}

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ChatFormData>({
    name: "",
    email: "",
    message: "",
  });

  // 🧲 Draggable Position
  const [position, setPosition] = useState({
  x: window.innerWidth - 120,
  y: window.innerHeight - 140,
});

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: React.PointerEvent) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;

    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;

    setPosition({
      x: Math.max(10, Math.min(newX, window.innerWidth - 70)),
      y: Math.max(10, Math.min(newY, window.innerHeight - 70)),
    });
  };

  const handleDragEnd = () => {
    dragging.current = false;
  };
  const getPopupPosition = () => {
    const isLeftSide = position.x < window.innerWidth / 2;
    const isTopSide = position.y < window.innerHeight / 2;

    return {
      top: isTopSide ? position.y + 70 : position.y - 330,
      left: isLeftSide ? position.x : position.x - 260,
    };
  };
  // 🍀 Form change
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  // 📩 Submit
  const handleSend = () => {
    if (!formData.name || !formData.email || !formData.message) {
      return notifications.show({
        title: "Thiếu thông tin",
        message: "Vui lòng nhập đủ tên, email và nội dung.",
        color: "red",
      });
    }

    if (!validateEmail(formData.email)) {
      return notifications.show({
        title: "Email không hợp lệ",
        message: "Hãy nhập định dạng email hợp lệ.",
        color: "orange",
      });
    }

    console.log("📨 Submitted:", formData);

    notifications.show({
      title: "Đã gửi!",
      message: "Chúng tôi sẽ liên hệ bạn sớm nhất.",
      color: "pink",
    });

    setFormData({ name: "", email: "", message: "" });
    setOpen(false);
  };

  return (
    <>
      {/* 🟣 Draggable Floating Button */}
      <button
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onClick={() => !dragging.current && setOpen((prev) => !prev)}
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "linear-gradient(90deg, #ff3df9, #7b5cff)",
          color: "#fff",
          fontSize: "24px",
          cursor: dragging.current ? "grabbing" : "grab",
          border: "none",
          zIndex: 9999,
          transition: dragging.current ? "none" : ".2s",
          boxShadow: "0 0 22px rgba(255,0,255,0.35)",
        }}
      >
        💬
      </button>

      {/* 🟣 Popup always follows the button */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: getPopupPosition().top,
            left: getPopupPosition().left,
            width: "260px",
            background: "rgba(15,11,32,0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "14px",
            padding: "18px",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 0 25px rgba(255,0,255,0.25)",
            zIndex: 9998,
            animation: "fadeUp .25s ease",
            color: "#fff",
          }}
        >
          <h3 style={{ marginBottom: 6, fontSize: 18 }}>
            🚀 Chat với SocialKing
          </h3>
          <p style={{ marginBottom: 12, fontSize: 13, color: "#ccc" }}>
            Chúng tôi sẵn sàng trợ giúp.
          </p>

          <ChatInput
            name="name"
            value={formData.name}
            placeholder="Họ và tên"
            onChange={handleChange}
          />
          <ChatInput
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <ChatInput
            textarea
            name="message"
            value={formData.message}
            placeholder="Tin nhắn..."
            onChange={handleChange}
          />

          <button
            onClick={handleSend}
            style={{
              width: "100%",
              background: "linear-gradient(90deg,#ff3df9,#7b5cff)",
              padding: "10px",
              borderRadius: "8px",
              color: "#fff",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Gửi tin nhắn
          </button>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

// ---- Input Component ----
const ChatInput = ({
  name,
  value,
  placeholder,
  textarea,
  onChange,
}: {
  name: string;
  value: string;
  placeholder: string;
  textarea?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
  return textarea ? (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={inputStyle}
      rows={3}
    />
  ) : (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={inputStyle}
    />
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "rgba(255,255,255,0.07)",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.15)",
  marginBottom: "10px",
  color: "#fff",
};
