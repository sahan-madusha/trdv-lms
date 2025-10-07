import { WhatsAppOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";

export const WhatsApp = () => {
  return (
    <>
      <Tooltip placement="right" title={"Contact us on whatsapp"}>
        <Button
          type="default"
          shape="circle"
          size="large"
          style={{ padding: "1.6rem" }}
          className="shadow-lg mx-0 md:mx-5 fixed top-[30%] md:top-[22%] z-[99]"
          icon={
            <WhatsAppOutlined
              style={{ fontSize: "1.6rem" }}
              className="text-green-600"
            />
          }
        />
      </Tooltip>
    </>
  );
};
