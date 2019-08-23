
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
  BAD0 = 5,
  BAD1 = 6,
  BAD2 = 7,
  BAD3 = 8,
  BAD4 = 9,
  BAD5 = 10,
  POW0 = 11,
  POW1 = 12,
  POW2 = 13,
  POW3 = 14,
  HERO = 15,
  SHLD = 16,
  STN0 = 17,
  STN1 = 18,
  STN2 = 19,
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
  };