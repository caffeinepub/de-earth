import AccessControl "./access-control";
import Prim "mo:prim";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

mixin (accessControlState : AccessControl.AccessControlState) {
  // Initialize auth (kept for compatibility but not required for access)
  public shared ({ caller }) func _initializeAccessControlWithSecret(userSecret : Text) : async () {
    switch (Prim.envVar<system>("CAFFEINE_ADMIN_TOKEN")) {
      case (null) {};
      case (?adminToken) {
        AccessControl.initialize(accessControlState, caller, adminToken, userSecret);
      };
    };
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    if (caller.isAnonymous()) { return #guest };
    return #admin;
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    // Any authenticated user can assign roles
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized");
    };
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // Any logged-in (non-anonymous) user is admin
  public query ({ caller }) func isCallerAdmin() : async Bool {
    not caller.isAnonymous();
  };
};
