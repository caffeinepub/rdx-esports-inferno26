import AccessControl "./authorization/access-control";
import MixinAuthorization "./authorization/MixinAuthorization";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Team = {
    teamName : Text;
    leaderName : Text;
  };

  var teams : [Team] = [];

  public func registerTeam(teamName : Text, leaderName : Text) : async () {
    let newTeam : Team = { teamName = teamName; leaderName = leaderName };
    teams := teams.concat([newTeam]);
  };

  public query func getTeams() : async [Team] {
    teams;
  };

  public shared ({ caller }) func deleteTeam(index : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete teams");
    };
    if (index >= teams.size()) {
      Runtime.trap("Index out of bounds");
    };
    teams := Array.tabulate<Team>(teams.size() - 1, func i {
      if (i < index) { teams[i] } else { teams[i + 1] }
    });
  };

  public query func getTeamCount() : async Nat {
    teams.size();
  };
};