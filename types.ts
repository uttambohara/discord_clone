import { Member, Server, Profile, Channel } from "@prisma/client";

export type ServerWithMembersWithChannels = Server & {
  members: (Member & { profile: Profile | null })[];
  channels: Channel[];
};
