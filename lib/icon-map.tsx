import { ChannelType, MemberRole } from "@prisma/client";
import {
  Activity,
  Hash,
  Play,
  Shield,
  ShieldAlert,
  ShieldCheckIcon,
} from "lucide-react";

export const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert color="red" size={18} />,
  [MemberRole.MODERATOR]: <ShieldCheckIcon color="purple" size={18} />,
  [MemberRole.GUEST]: <Shield color="gray" size={18} />,
};

export const channelconMap = {
  [ChannelType.TEXT]: <Hash color="gray" />,
  [ChannelType.AUDIO]: <Activity color="gray" />,
  [ChannelType.VIDEO]: <Play color="gray" />,
};
