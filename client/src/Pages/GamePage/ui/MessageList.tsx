import React from "react";
import { selectOnlineCountChat } from "../../../Entities/Chat/ChatSlice";
import { useAppSelector } from "../../../Shared/storeHooks";

const MessageList: React.FC = () => {
  const onlineCount = useAppSelector(selectOnlineCountChat);
  return <div>Online: {onlineCount}</div>;
};

export default MessageList;
