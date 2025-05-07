import { HanOption, FuOption } from '../types/mahjong';

/**
 * Han (fan) options for selection
 */
export const HAN_OPTIONS: HanOption[] = [
  { value: 1, label: "1番" },
  { value: 2, label: "2番" },
  { value: 3, label: "3番" },
  { value: 4, label: "4番" },
  { value: 5, label: "5番", limitName: "满贯 (Mangan)" },
  { value: 6, label: "6番", limitName: "跳满 (Haneman)" },
  { value: 7, label: "7番", limitName: "跳满 (Haneman)" },
  { value: 8, label: "8番", limitName: "倍满 (Baiman)" },
  { value: 9, label: "9番", limitName: "倍满 (Baiman)" },
  { value: 10, label: "10番", limitName: "倍满 (Baiman)" },
  { value: 11, label: "11番", limitName: "三倍满 (Sanbaiman)" },
  { value: 12, label: "12番", limitName: "三倍满 (Sanbaiman)" },
  { value: 13, label: "13番+", limitName: "役满 (Yakuman)" }
];

/**
 * Fu (minipoints) options for selection
 */
export const FU_OPTIONS: FuOption[] = [
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
  { value: 110, label: "110符" }
];

/**
 * Tooltips for mahjong terms
 */
export const TOOLTIPS = {
  dealer: "庄家 (Dealer) - The player who is East in the current round",
  nonDealer: "闲家 (Non-dealer) - Players who are not East in the current round",
  ron: "荣和 (Ron) - Winning by taking a tile discarded by another player",
  tsumo: "自摸 (Tsumo) - Winning by drawing a tile yourself",
  han: "番 (Han/Fan) - Scoring elements based on your hand's patterns and winning conditions",
  fu: "符 (Fu/Minipoints) - Technical points based on your hand's composition",
  mangan: "满贯 (Mangan) - The basic limit hand (5 han or 4 han with 40+ fu)",
  haneman: "跳满 (Haneman) - 1.5x the basic limit (6-7 han)",
  baiman: "倍满 (Baiman) - 2x the basic limit (8-10 han)",
  sanbaiman: "三倍满 (Sanbaiman) - 3x the basic limit (11-12 han)",
  yakuman: "役满 (Yakuman) - The maximum limit (13+ han or special yakuman hands)"
};