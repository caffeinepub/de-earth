import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContactInquiry, Project, TeamMember } from "../backend.d";
import { sampleProjects, sampleTeamMembers } from "../data/sampleData";
import { useActor } from "./useActor";

export function useAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return sampleProjects;
      const result = await actor.getAllProjects();
      return result.length > 0 ? result : sampleProjects;
    },
    enabled: !isFetching,
    placeholderData: sampleProjects,
  });
}

export function useProject(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Project | null>({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor) return sampleProjects.find((p) => p.id === id) ?? null;
      const result = await actor.getProject(id);
      if (result) return result;
      return sampleProjects.find((p) => p.id === id) ?? null;
    },
    enabled: !isFetching && !!id,
  });
}

export function useSearchProjects(term: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects", "search", term],
    queryFn: async () => {
      if (!actor) {
        const lower = term.toLowerCase();
        return sampleProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(lower) ||
            p.location.toLowerCase().includes(lower),
        );
      }
      return actor.searchProjects(term);
    },
    enabled: !isFetching && term.length > 0,
  });
}

export function useAllTeamMembers() {
  const { actor, isFetching } = useActor();
  return useQuery<TeamMember[]>({
    queryKey: ["team"],
    queryFn: async () => {
      if (!actor) return sampleTeamMembers;
      const result = await actor.getAllTeamMembers();
      return result.length > 0 ? result : sampleTeamMembers;
    },
    enabled: !isFetching,
    placeholderData: sampleTeamMembers,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
  });
}

export function useAllContactInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactInquiries();
    },
    enabled: !isFetching,
  });
}

export function useSubmitContactInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (inquiry: ContactInquiry) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactInquiry(inquiry);
    },
  });
}

export function useAddProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProject(project);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, project }: { id: string; project: Project }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProject(id, project);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useAddTeamMember() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: TeamMember) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTeamMember(member);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });
}

export function useDeleteTeamMember() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTeamMember(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });
}
