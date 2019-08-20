
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
  POW0 = 9,
  POW1 = 10,
  POW2 = 11,
  POW3 = 12,
  HERO = 13,
  SHLD = 14,
  STN0 = 15,
  STN1 = 16,
  STN2 = 17,
  STN3 = 18,
  BACK = 19,
  LIFE = 20,

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

  SHIELD_TIME = 4,

  RND = (mn: number, mx: number) => {
    return Math.floor(Math.random() * (mx - mn) + mn);
  };