import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(arg0: Principal, arg1: UserRole): Promise<void>;
    deleteTeam(arg0: bigint): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getTeamCount(): Promise<bigint>;
    getTeams(): Promise<Array<{
        teamName: string;
        leaderName: string;
    }>>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * Team registration
     */
    registerTeam(arg0: string, arg1: string): Promise<void>;
}
