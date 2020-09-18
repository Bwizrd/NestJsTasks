//feature
class FriendList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend`);
  }

  removeFriend(name) {
      const idx = this.friends.indexOf(name);

      if (idx === -1) {
          throw new Error('Friend not found!');
      }

      this.friends.splice(idx, 1);
  }
}

// tests

describe('FriendList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
    //  expect(true).toEqual(true);
  });

  it('add a friend to the list', () => {
    friendsList.addFriend('Paul');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announce freindship', () => {
    friendsList.announceFriendship = jest.fn();
    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Paul');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Paul');
  });

  describe('remove friend', () => {
      it('removes a friend from the list', () => {
        friendsList.addFriend('Paul');
        expect(friendsList.friends[0]).toEqual('Paul');
        friendsList.removeFriend('Paul');
        expect(friendsList.friends[0]).toBeUndefined;

      })
      it('trows an error as friend does not exist', () => {
            expect( ()=> friendsList.removeFriend('Paul')).toThrow(new Error('Friend not found!'));      
      })
  })
});
