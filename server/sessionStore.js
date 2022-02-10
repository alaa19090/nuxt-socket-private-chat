/* abstract */ class SessionStore {
  findSession(id) {}
  saveSession(id, session) {}
  findMyFrindsIfOnlen(user) {}
  findAllSessions() {}
  removeSession(id){}
}

class InMemorySessionStore extends SessionStore {
  constructor() {
    super();
    this.sessions = new Map();
  }

  findSession(id) {
    return this.sessions.get(id);
  }
  removeSession(id) {
    return this.sessions .delete(id)
  }
  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
  

  findMyFrindsIfOnlen(user) {
    if (!user) return 
    const new_user_friends = new Set(user.following);
    const users_on_server =[...this.sessions.values()];
    //find users friends if is online
    let result = users_on_server.filter(({ userID }) =>{return  new_user_friends.has(userID)})
    return result;
  }
}

module.exports = {
  InMemorySessionStore,
};
