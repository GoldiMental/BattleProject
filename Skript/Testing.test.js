const Cheat = require('./Menu');

global.prompt = jest.fn();
global.alert = jest.fn();
global.setCookie = jest.fn();

describe('Cheat Function', () => {
  let Player;

  beforeEach(() => {
    global.prompt.mockClear();
    global.alert.mockClear();
    global.setCookie.mockClear();
    Player = { Gold: 500, Cheats: 0, name: 'Spieler1' };
    global.Player = Player;
  });

  test('should add gold when MOREGOLD cheat is entered', () => {
    global.prompt.mockReturnValue('MOREGOLD');
    Cheat();
    expect(Player.Gold).toBe(1500);
    expect(Player.Cheats).toBe(1);
    expect(global.alert).toHaveBeenCalledWith('MOREGOLD wurde erfolgreich ausgeführt!');
    expect(global.setCookie).toHaveBeenCalledWith('PlayerData', JSON.stringify(Player), 30);
  });

  test('should change player name when CHANGENAME cheat is entered', () => {
    global.prompt.mockReturnValueOnce('CHANGENAME').mockReturnValueOnce('NeuerSpieler');
    Cheat();
    expect(Player.name).toBe('NeuerSpieler');
    expect(Player.Cheats).toBe(1);
    expect(global.alert).toHaveBeenCalledWith('Der Name wurde zu NeuerSpieler geändert.');
    expect(global.setCookie).toHaveBeenCalledWith('PlayerData', JSON.stringify(Player), 30);
  });

  test('should display an error message for an invalid cheat', () => {
    global.prompt.mockReturnValue('INVALIDCHEAT');
    Cheat();
    expect(global.alert).toHaveBeenCalledWith('Cheat ungültig');
    expect(Player.Gold).toBe(500);
    expect(Player.Cheats).toBe(0);
    expect(global.setCookie).not.toHaveBeenCalled();
  });
});