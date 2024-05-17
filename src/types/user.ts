export enum UserStatus {
  Away = "AWAY",
  Active = "ACTIVE",
}

export const UserStatusMapper = {
  Away: ["AWAY", "AUSENTE"],
  Active: ["ACTIVE", "ATIVO"],
};

export type User = {
  id: string;
  name: string;
};
