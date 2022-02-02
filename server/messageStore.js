/* abstract */ class MessageStore {
  saveMessage(message) {}
  saveUserChat(message) {}
  findMessagesForUser(userID) {}
  removeUserMessage(chatID) {}
}

class InMemoryMessageStore extends MessageStore {
  constructor() {
    super();
    this.messages = [];
    this.chat = new Map();
  }

  saveMessage(message) {
    this.messages.push(message);
  }

  saveUserChat(message) {
    // create unique chat id between two users 
    let chatID =
      message.from > message.to
        ? `${message.from + "" + message.to}`
        : `${message.to + "" + message.from}`;
    // check if the chatID is on the server
    let ifAlreadySet = this.chat.get(chatID);
    if (ifAlreadySet) {

      // if true add the messeges to the same chat
      this.chat.get(chatID).messages.push(message)
      
    } else {

      // if not creat new chat object on server
      this.chat.set(chatID,{ messages:[message] ,chatID});
    }
  }
  
  removeUserMessage(chatID) {
    this.chat.get(chatID) = null
  }

  findMessagesForUser(userID) {
    return this.messages.filter(
      ({ from, to }) => from === userID || to === userID
    );
  }
}

module.exports = {
  InMemoryMessageStore,
};
