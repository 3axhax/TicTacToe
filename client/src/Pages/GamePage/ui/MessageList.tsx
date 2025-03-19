import React from "react";
import { useAppSelector } from "../../../Shared/storeHooks";
import { selectOnlineCountUsersList } from "../../../Entities/UsersList/UsersListSlice";

const MessageList: React.FC = () => {
  const onlineCount = useAppSelector(selectOnlineCountUsersList);
  return <div>Online: {onlineCount}</div>;
};

export default MessageList;
