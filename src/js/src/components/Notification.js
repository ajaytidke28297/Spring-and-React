import { notification } from "antd";

const opneNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export const successNotification = (message, description) =>
  opneNotification("success", message, description);

export const infoNotification = (message, description) =>
  opneNotification("info", message, description);

export const warningNotification = (message, description) =>
  opneNotification("warning", message, description);

export const errorNotification = (message, description) =>
  opneNotification("error", message, description);
