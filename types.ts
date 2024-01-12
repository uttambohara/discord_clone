import { Member, Server, Profile } from "@prisma/client";

export type ExtendedServerProps = Server & {
  members: (Member & { profile: Profile | null })[];
};
