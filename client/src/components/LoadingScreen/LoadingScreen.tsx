import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface LoadingScreenProps {
  messageQueue: string | { message: string; duration?: number }[];
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  messageQueue,
}) => {
  const [currentMessage, setCurrentMessage] = useState<string>(
    typeof messageQueue === "string"
      ? messageQueue
      : messageQueue[0]?.message || "Waiting..."
  );

  useEffect(() => {
    let index = 0;

    const messages = Array.isArray(messageQueue)
      ? messageQueue
      : [{ message: messageQueue, duration: 2000 }];

    const intervalId = setInterval(() => {
      if (index < messages.length) {
        setCurrentMessage(messages[index].message);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, messages[index]?.duration || 2000);

    return () => clearInterval(intervalId);
  }, [messageQueue]);

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-y-10">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      <p className="text-sm">{currentMessage}</p>
    </div>
  );
};
