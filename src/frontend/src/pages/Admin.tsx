import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Check, Edit, Loader2, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Project, TeamMember } from "../backend.d";
import { ProjectCategory } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProject,
  useAddTeamMember,
  useAllContactInquiries,
  useAllProjects,
  useAllTeamMembers,
  useDeleteProject,
  useDeleteTeamMember,
  useIsAdmin,
  useUpdateProject,
} from "../hooks/useQueries";

const emptyProject = (): Project => ({
  id: crypto.randomUUID(),
  title: "",
  order: 1n,
  area: "",
  year: BigInt(new Date().getFullYear()),
  conceptDescription: "",
  imageIds: [],
  isFeatured: false,
  isArchive: false,
  materials: "",
  category: ProjectCategory.residential,
  sustainabilityHighlights: "",
  location: "",
});

const emptyMember = (): TeamMember => ({
  id: crypto.randomUUID(),
  name: "",
  role: "",
  bio: "",
  order: 1n,
  imageId: "",
});

export default function Admin() {
  const navigate = useNavigate();
  const { login, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: projects = [] } = useAllProjects();
  const { data: team = [] } = useAllTeamMembers();
  const { data: inquiries = [] } = useAllContactInquiries();

  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const addMember = useAddTeamMember();
  const deleteMember = useDeleteTeamMember();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Project>(emptyProject());
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newMember, setNewMember] = useState<TeamMember>(emptyMember());
  const [showMemberForm, setShowMemberForm] = useState(false);

  useEffect(() => {
    if (!checkingAdmin && isAdmin === false) {
      toast.error("Admin access required.");
      navigate({ to: "/" });
    }
  }, [isAdmin, checkingAdmin, navigate]);

  if (!identity) {
    return (
      <div
        className="min-h-screen pt-40 flex flex-col items-center justify-center px-6"
        data-ocid="admin.section"
      >
        <h1 className="font-serif text-4xl text-foreground mb-6">Admin</h1>
        <p className="font-sans text-sm text-muted-foreground mb-8">
          Please log in to access the admin panel.
        </p>
        <button
          type="button"
          onClick={login}
          disabled={loginStatus === "logging-in"}
          data-ocid="admin.login.primary_button"
          className="font-sans text-sm tracking-widest uppercase border border-foreground px-8 py-3 text-foreground hover:bg-foreground hover:text-background transition-all flex items-center gap-2"
        >
          {loginStatus === "logging-in" && (
            <Loader2 size={14} className="animate-spin" />
          )}
          Log In
        </button>
      </div>
    );
  }

  if (checkingAdmin) {
    return (
      <div
        className="min-h-screen pt-40 flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const handleSaveProject = async () => {
    const p = editingProject ?? newProject;
    try {
      if (editingProject) {
        await updateProject.mutateAsync({ id: p.id, project: p });
        toast.success("Project updated.");
        setEditingProject(null);
      } else {
        await addProject.mutateAsync(p);
        toast.success("Project added.");
        setNewProject(emptyProject());
        setShowProjectForm(false);
      }
    } catch {
      toast.error("Failed to save project.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Project deleted.");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const handleSaveMember = async () => {
    try {
      await addMember.mutateAsync(newMember);
      toast.success("Team member added.");
      setNewMember(emptyMember());
      setShowMemberForm(false);
    } catch {
      toast.error("Failed to add team member.");
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    try {
      await deleteMember.mutateAsync(id);
      toast.success("Team member removed.");
    } catch {
      toast.error("Failed to remove team member.");
    }
  };

  const projectFormData = editingProject ?? newProject;
  const setProjectField = (key: keyof Project, value: any) => {
    if (editingProject) {
      setEditingProject((p) => (p ? { ...p, [key]: value } : p));
    } else {
      setNewProject((p) => ({ ...p, [key]: value }));
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-4xl text-foreground mb-2">
          Admin Panel
        </h1>
        <p className="font-sans text-sm text-muted-foreground mb-10">
          Logged in as {identity.getPrincipal().toString().slice(0, 16)}…
        </p>

        <Tabs defaultValue="projects" data-ocid="admin.panel">
          <TabsList className="mb-8 bg-muted">
            <TabsTrigger value="projects" data-ocid="admin.projects.tab">
              Projects
            </TabsTrigger>
            <TabsTrigger value="team" data-ocid="admin.team.tab">
              Team
            </TabsTrigger>
            <TabsTrigger value="inquiries" data-ocid="admin.inquiries.tab">
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-foreground">Projects</h2>
              <button
                type="button"
                onClick={() => {
                  setShowProjectForm(true);
                  setEditingProject(null);
                }}
                data-ocid="admin.projects.open_modal_button"
                className="font-sans text-xs tracking-widest uppercase border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>

            {(showProjectForm || editingProject) && (
              <div
                className="border border-border p-6 mb-8 bg-card"
                data-ocid="admin.project.dialog"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-xl">
                    {editingProject ? "Edit Project" : "New Project"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectForm(false);
                      setEditingProject(null);
                    }}
                    data-ocid="admin.project.close_button"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Title
                    </Label>
                    <Input
                      value={projectFormData.title}
                      onChange={(e) => setProjectField("title", e.target.value)}
                      data-ocid="admin.project.input"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Location
                    </Label>
                    <Input
                      value={projectFormData.location}
                      onChange={(e) =>
                        setProjectField("location", e.target.value)
                      }
                      data-ocid="admin.project.input"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Year
                    </Label>
                    <Input
                      type="number"
                      value={projectFormData.year.toString()}
                      onChange={(e) =>
                        setProjectField("year", BigInt(e.target.value || 0))
                      }
                      data-ocid="admin.project.input"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Area
                    </Label>
                    <Input
                      value={projectFormData.area}
                      onChange={(e) => setProjectField("area", e.target.value)}
                      data-ocid="admin.project.input"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Category
                    </Label>
                    <Select
                      value={projectFormData.category}
                      onValueChange={(v) =>
                        setProjectField("category", v as ProjectCategory)
                      }
                    >
                      <SelectTrigger
                        data-ocid="admin.project.select"
                        className="bg-background"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ProjectCategory.residential}>
                          Residential
                        </SelectItem>
                        <SelectItem value={ProjectCategory.commercial}>
                          Commercial
                        </SelectItem>
                        <SelectItem value={ProjectCategory.institutional}>
                          Institutional
                        </SelectItem>
                        <SelectItem value={ProjectCategory.landscape}>
                          Landscape
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Materials
                    </Label>
                    <Input
                      value={projectFormData.materials}
                      onChange={(e) =>
                        setProjectField("materials", e.target.value)
                      }
                      data-ocid="admin.project.input"
                      className="bg-background"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Concept Description
                    </Label>
                    <Textarea
                      value={projectFormData.conceptDescription}
                      onChange={(e) =>
                        setProjectField("conceptDescription", e.target.value)
                      }
                      rows={3}
                      data-ocid="admin.project.textarea"
                      className="bg-background resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Sustainability Highlights
                    </Label>
                    <Textarea
                      value={projectFormData.sustainabilityHighlights}
                      onChange={(e) =>
                        setProjectField(
                          "sustainabilityHighlights",
                          e.target.value,
                        )
                      }
                      rows={2}
                      data-ocid="admin.project.textarea"
                      className="bg-background resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={projectFormData.isFeatured}
                      onCheckedChange={(v) => setProjectField("isFeatured", v)}
                      data-ocid="admin.project.switch"
                    />
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Featured
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={projectFormData.isArchive}
                      onCheckedChange={(v) => setProjectField("isArchive", v)}
                      data-ocid="admin.project.switch"
                    />
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Archive
                    </Label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleSaveProject}
                    disabled={addProject.isPending || updateProject.isPending}
                    data-ocid="admin.project.save_button"
                    className="font-sans text-xs tracking-widest uppercase bg-primary text-primary-foreground px-6 py-2 flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {(addProject.isPending || updateProject.isPending) && (
                      <Loader2 size={12} className="animate-spin" />
                    )}
                    <Check size={12} /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectForm(false);
                      setEditingProject(null);
                    }}
                    data-ocid="admin.project.cancel_button"
                    className="font-sans text-xs tracking-widest uppercase border border-border px-6 py-2 hover:border-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="divide-y divide-border border-t border-b border-border">
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-4 gap-4"
                  data-ocid={`admin.projects.item.${i + 1}`}
                >
                  <div>
                    <p className="font-serif text-base text-foreground">
                      {p.title}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {p.location} · {p.year.toString()} · {p.category}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(p);
                        setShowProjectForm(false);
                      }}
                      data-ocid={`admin.projects.edit_button.${i + 1}`}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(p.id)}
                      data-ocid={`admin.projects.delete_button.${i + 1}`}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-foreground">Team</h2>
              <button
                type="button"
                onClick={() => setShowMemberForm(true)}
                data-ocid="admin.team.open_modal_button"
                className="font-sans text-xs tracking-widest uppercase border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
              >
                <Plus size={14} /> Add Member
              </button>
            </div>

            {showMemberForm && (
              <div
                className="border border-border p-6 mb-8 bg-card"
                data-ocid="admin.member.dialog"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-xl">New Team Member</h3>
                  <button
                    type="button"
                    onClick={() => setShowMemberForm(false)}
                    data-ocid="admin.member.close_button"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Name
                    </Label>
                    <Input
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember((m) => ({ ...m, name: e.target.value }))
                      }
                      data-ocid="admin.member.input"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Role
                    </Label>
                    <Input
                      value={newMember.role}
                      onChange={(e) =>
                        setNewMember((m) => ({ ...m, role: e.target.value }))
                      }
                      data-ocid="admin.member.input"
                      className="bg-background"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Bio
                    </Label>
                    <Textarea
                      value={newMember.bio}
                      onChange={(e) =>
                        setNewMember((m) => ({ ...m, bio: e.target.value }))
                      }
                      rows={3}
                      data-ocid="admin.member.textarea"
                      className="bg-background resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleSaveMember}
                    disabled={addMember.isPending}
                    data-ocid="admin.member.save_button"
                    className="font-sans text-xs tracking-widest uppercase bg-primary text-primary-foreground px-6 py-2 flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {addMember.isPending && (
                      <Loader2 size={12} className="animate-spin" />
                    )}
                    <Check size={12} /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMemberForm(false)}
                    data-ocid="admin.member.cancel_button"
                    className="font-sans text-xs tracking-widest uppercase border border-border px-6 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="divide-y divide-border border-t border-b border-border">
              {team.map((member, i) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-4"
                  data-ocid={`admin.team.item.${i + 1}`}
                >
                  <div>
                    <p className="font-serif text-base text-foreground">
                      {member.name}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(member.id)}
                    data-ocid={`admin.team.delete_button.${i + 1}`}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <h2 className="font-serif text-2xl text-foreground mb-6">
              Inquiries
            </h2>
            {inquiries.length === 0 ? (
              <p
                className="font-sans text-muted-foreground"
                data-ocid="admin.inquiries.empty_state"
              >
                No inquiries yet.
              </p>
            ) : (
              <div className="divide-y divide-border border-t border-b border-border">
                {inquiries.map((inq, i) => (
                  <div
                    key={inq.id}
                    className="py-5"
                    data-ocid={`admin.inquiries.item.${i + 1}`}
                  >
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mb-2">
                      <p className="font-serif text-base text-foreground">
                        {inq.name}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground self-center">
                        {inq.email}
                      </p>
                      <p className="font-sans text-xs text-primary self-center">
                        {inq.projectType}
                      </p>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground">
                      {inq.message}
                    </p>
                    {inq.budget && (
                      <p className="font-sans text-xs text-muted-foreground mt-1">
                        Budget: {inq.budget}
                      </p>
                    )}
                    <p className="font-sans text-xs text-muted-foreground mt-1">
                      {new Date(Number(inq.timestamp)).toLocaleDateString(
                        "en-IN",
                        { dateStyle: "medium" },
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
