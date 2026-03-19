import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TeamMember {
    id: string;
    bio: string;
    order: bigint;
    name: string;
    role: string;
    imageId: string;
}
export interface Project {
    id: string;
    title: string;
    order: bigint;
    area: string;
    year: bigint;
    conceptDescription: string;
    imageIds: Array<string>;
    isFeatured: boolean;
    isArchive: boolean;
    materials: string;
    category: ProjectCategory;
    sustainabilityHighlights: string;
    location: string;
}
export interface ContactInquiry {
    id: string;
    projectType: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
    budget?: string;
}
export enum ProjectCategory {
    commercial = "commercial",
    institutional = "institutional",
    residential = "residential",
    landscape = "landscape"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProject(project: Project): Promise<void>;
    addTeamMember(member: TeamMember): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProject(id: string): Promise<void>;
    deleteTeamMember(id: string): Promise<void>;
    getAllContactInquiries(): Promise<Array<ContactInquiry>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllTeamMembers(): Promise<Array<TeamMember>>;
    getCallerUserRole(): Promise<UserRole>;
    getProject(id: string): Promise<Project | null>;
    isCallerAdmin(): Promise<boolean>;
    searchProjects(term: string): Promise<Array<Project>>;
    submitContactInquiry(inquiry: ContactInquiry): Promise<void>;
    updateProject(id: string, updatedProject: Project): Promise<void>;
    updateTeamMember(id: string, updatedMember: TeamMember): Promise<void>;
}
