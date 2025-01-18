import type { User as DomainUser } from "@/domain/user";

export type User = Pick<DomainUser, "name">;
