import { SelectOption, WinningMethod } from "../types/mahjong";

export const ROLE_OPTIONS: SelectOption<boolean>[] = [
  { value: true, label: "庄家<br>（Dealer）" },
  { value: false, label: "闲家<br>（Non-Dealer）" },
];

export const WIN_OPTIONS: SelectOption<WinningMethod>[] = [
  { value: WinningMethod.TSUMO, label: "自摸（Tsumo）" },
  { value: WinningMethod.RON, label: "荣和（Ron）" },
];

export const HAN_OPTIONS: SelectOption<number>[] = [
  { value: 1, label: "1番" },
  { value: 2, label: "2番" },
  { value: 3, label: "3番" },
  { value: 4, label: "4番" },
  { value: 5, label: "5番/满贯<br>（Mangan）" },
  { value: 6, label: "6番/跳满<br>（Haneman）" },
  { value: 7, label: "7番/跳满<br>（Haneman）" },
  { value: 8, label: "8番/倍满<br>（Baiman）" },
  { value: 9, label: "9番/倍满<br>（Baiman）" },
  { value: 10, label: "10番/倍满<br>（Baiman）" },
  { value: 11, label: "11番/三倍满<br>（Sanbaiman）" },
  { value: 12, label: "12番/三倍满<br>（Sanbaiman）" },
  { value: 13, label: "13+番/役满<br>（Yakuman）" },
];

// 一番的时候没有20符和25符的选项
export const FU_1HAN_OPTIONS: SelectOption<number>[] = [
  //   { value: -1, label: "手动" },
  { value: 30, label: "30符" },
  { value: 40, label: "40符" },
  { value: 50, label: "50符" },
  { value: 60, label: "60符" },
  { value: 70, label: "70符" },
  { value: 80, label: "80符" },
  { value: 90, label: "90符" },
  { value: 100, label: "100符" },
  { value: 110, label: "110符" },
];

export const FU_OPTIONS: SelectOption<number>[] = [
  //   { value: -1, label: "手动" },
  { value: 20, label: "20符" },
  { value: 25, label: "25符" },
  { value: 30, label: "30符" },
  { value: 40, label: "40符" },
  { value: 50, label: "50符" },
  { value: 60, label: "60符" },
  { value: 70, label: "70符" },
  { value: 80, label: "80符" },
  { value: 90, label: "90符" },
  { value: 100, label: "100符" },
  { value: 110, label: "110符" },
];

export const FU_POINTS_MAP: {
  [han: number]: {
    [fu: number]: [number, number, number, number];
  };
} = {
  1: {
    30: [300, 500, 1000, 1500],
    40: [400, 700, 1300, 2000],
    50: [400, 800, 1600, 2400],
    60: [500, 1000, 2000, 2900],
    70: [600, 1200, 2300, 3400],
    80: [700, 1300, 2600, 3900],
    90: [800, 1500, 2900, 4400],
    100: [800, 1600, 3200, 4800],
    110: [900, 1800, 3600, 5300],
  },
  2: {
    20: [400, 700, 1300, 2000],
    25: [400, 800, 1600, 2400],
    30: [500, 1000, 2000, 2900],
    40: [700, 1300, 2600, 3900],
    50: [800, 1600, 3200, 4800],
    60: [1000, 2000, 3900, 5800],
    70: [1200, 2300, 4500, 6800],
    80: [1300, 2600, 5200, 7700],
    90: [1500, 2900, 5800, 8700],
    100: [1600, 3200, 6400, 9600],
    110: [1800, 3600, 7100, 10600],
  },
  3: {
    20: [700, 1300, 2600, 3900],
    25: [800, 1600, 3200, 4800],
    30: [1000, 2000, 3900, 5800],
    40: [1300, 2600, 5200, 7700],
    50: [1600, 3200, 6400, 9600],
    60: [2000, 3900, 7700, 11600],
    70: [2000, 4000, 8000, 12000],
    80: [2000, 4000, 8000, 12000],
    90: [2000, 4000, 8000, 12000],
    100: [2000, 4000, 8000, 12000],
    110: [2000, 4000, 8000, 12000],
  },
  4: {
    20: [1300, 2600, 5200, 7700],
    25: [1600, 3200, 6400, 9600],
    30: [2000, 3900, 7700, 11600],
    40: [2000, 4000, 8000, 12000],
    50: [2000, 4000, 8000, 12000],
    60: [2000, 4000, 8000, 12000],
    70: [2000, 4000, 8000, 12000],
    80: [2000, 4000, 8000, 12000],
    90: [2000, 4000, 8000, 12000],
    100: [2000, 4000, 8000, 12000],
    110: [2000, 4000, 8000, 12000],
  },
};

export const MANGAN_POINTS_MAP: {
  [key in WinningMethod]: {
    [han: number]: [number, number];
  };
} = {
  [WinningMethod.RON]: {
    5: [8000, 12000],
    6: [12000, 18000],
    7: [12000, 18000],
    8: [16000, 24000],
    9: [16000, 24000],
    10: [16000, 24000],
    11: [24000, 36000],
    12: [24000, 36000],
    13: [32000, 48000],
  },
  [WinningMethod.TSUMO]: {
    5: [2000, 4000],
    6: [3000, 6000],
    7: [3000, 6000],
    8: [4000, 8000],
    9: [4000, 8000],
    10: [4000, 8000],
    11: [6000, 12000],
    12: [6000, 12000],
    13: [8000, 16000],
  },
};
