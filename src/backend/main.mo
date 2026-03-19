import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Authorizations "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  module Project {
    public func compare(p1 : Project, p2 : Project) : Order.Order {
      Int.compare(p1.order, p2.order);
    };
  };

  module ContactInquiry {
    public func compareByTimestamp(inquiry1 : ContactInquiry, inquiry2 : ContactInquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  let accessControlState = Authorizations.initState();
  include MixinAuthorization(accessControlState);

  type ProjectCategory = {
    #residential;
    #commercial;
    #institutional;
    #landscape;
  };

  type Project = {
    id : Text;
    title : Text;
    category : ProjectCategory;
    location : Text;
    year : Nat;
    area : Text;
    conceptDescription : Text;
    materials : Text;
    sustainabilityHighlights : Text;
    imageIds : [Text];
    isArchive : Bool;
    isFeatured : Bool;
    order : Int;
  };

  type TeamMember = {
    id : Text;
    name : Text;
    role : Text;
    bio : Text;
    imageId : Text;
    order : Int;
  };

  type ContactInquiry = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    projectType : Text;
    budget : ?Text;
    message : Text;
    timestamp : Int;
  };

  let projects = Map.empty<Text, Project>();
  let teamMembers = Map.empty<Text, TeamMember>();
  let contactInquiries = Map.empty<Text, ContactInquiry>();

  public shared ({ caller }) func addProject(project : Project) : async () {
    needsAdmin(caller);
    projects.add(project.id, project);
  };

  public shared ({ caller }) func updateProject(id : Text, updatedProject : Project) : async () {
    needsAdmin(caller);
    if (not projects.containsKey(id)) { Runtime.trap("Project not found") };
    projects.add(id, updatedProject);
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    needsAdmin(caller);
    projects.remove(id);
  };

  public query ({ caller }) func getProject(id : Text) : async ?Project {
    projects.get(id);
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray().sort();
  };

  public shared ({ caller }) func addTeamMember(member : TeamMember) : async () {
    needsAdmin(caller);
    teamMembers.add(member.id, member);
  };

  public shared ({ caller }) func updateTeamMember(id : Text, updatedMember : TeamMember) : async () {
    needsAdmin(caller);
    if (not teamMembers.containsKey(id)) { Runtime.trap("Team member not found") };
    teamMembers.add(id, updatedMember);
  };

  public shared ({ caller }) func deleteTeamMember(id : Text) : async () {
    needsAdmin(caller);
    teamMembers.remove(id);
  };

  public query ({ caller }) func getAllTeamMembers() : async [TeamMember] {
    teamMembers.values().toArray();
  };

  public shared ({ caller }) func submitContactInquiry(inquiry : ContactInquiry) : async () {
    contactInquiries.add(inquiry.id, inquiry);
  };

  public query ({ caller }) func getAllContactInquiries() : async [ContactInquiry] {
    needsAdmin(caller);
    contactInquiries.values().toArray().sort(ContactInquiry.compareByTimestamp);
  };

  public query ({ caller }) func searchProjects(term : Text) : async [Project] {
    let searchTermLower = term.toLower();
    let results = List.empty<Project>();

    for ((_, project) in projects.entries()) {
      let inTitle = project.title.toLower().contains(#text searchTermLower);
      let inDescription = project.conceptDescription.toLower().contains(#text searchTermLower);
      let inLocation = project.location.toLower().contains(#text searchTermLower);
      if (inTitle or inDescription or inLocation) {
        results.add(project);
      };
    };
    results.toArray();
  };

  func needsAdmin(caller : Principal) {
    if (not Authorizations.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin privileges required");
    };
  };
};
