
export const
  TWO_PI = Math.PI * 2,
  WIDTH = 240,
  HEIGHT = 360,
  SCALE = 2,
  START = 1,
  PLAY = 2,
  GAMEOVER = 4,

  BOSS = 0,
  BLT0 = 1,
  BLT1 = 2,
  BLT2 = 3,
  BLT3 = 4,
  BLT4 = 5,
  BLT5 = 6,
  BAD0 = 7,
  BAD1 = 8,
  BAD2 = 9,
  BAD3 = 10,
  POW0 = 11,
  POW1 = 12,
  POW2 = 13,
  POW3 = 14,
  HERO = 15,
  SHLD = 16,
  STN0 = 17,
  STN1 = 28,
  STN2 = 29,
  STN3 = 20,
  BACK = 21,
  LIFE = 22,

  SHOT = 0,
  PWRUP = 1,
  HITBSS = 2,
  EXP0 = 3,
  EXP1 = 4,
  EXP2 = 5,
  DEAD = 6,
  BSSDED = 7,
  LOOP = 8,

  RELEASED = 0,
  PRESSED = 1,

  RND = (mn: number, mx: number) => {
    return Math.floor(Math.random() * (mx - mn) + mn);
  },

  RNDArr = (arr: any[]): any => {
    if (arr.length < 1) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  };