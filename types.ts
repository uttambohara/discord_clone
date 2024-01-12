import { Member, Server } from "@prisma/client";

export type ExtendedServerProps = Server & { members: Member[] };
