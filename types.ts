import { Server, Member, Profile, Channel } from "@prisma/client";

export type ServerWithMembersProfile = Server & {
  members: (Member & { profile: Profile | null })[];
} & { channels: Channel[] };
