import { MahjongPointState, MahjongPointResult, WinningMethod } from "../types/mahjong";
import { MANGAN_POINTS_MAP, FU_POINTS_MAP } from "./constants";

export function calcPoints(state: MahjongPointState): MahjongPointResult {  
  const { isDealer, winningMethod, han, fu } = state;
  if (han >= 5) {
    return calcMangan(isDealer, winningMethod, han);
  }
  return calcPointsForFu(isDealer, winningMethod, han, fu);
}

function calcMangan(isDealer: boolean, winningMethod: WinningMethod, han: number): MahjongPointResult {
  const points = MANGAN_POINTS_MAP[winningMethod][han];
  if (winningMethod === WinningMethod.RON) {
    return {
      total: isDealer ? points[1] : points[0],
      payWhenRon: isDealer ? points[1] : points[0],
      dealerPayWhenTsumo: 0,
      nonDealerPayWhenTsumo: 0,
    };
  } else {
    return {
      total: isDealer ? points[1] * 3 : points[0] * 2 + points[1],
      payWhenRon: 0,
      dealerPayWhenTsumo: isDealer ? 0 : points[0],
      nonDealerPayWhenTsumo: isDealer ? points[1] : points[0],
    };
  }
}

function calcPointsForFu(isDealer: boolean, winningMethod: WinningMethod, han: number, fu: number): MahjongPointResult {
  const points = FU_POINTS_MAP[han][fu];
  if (winningMethod === WinningMethod.RON) {
    return {
      total: isDealer ? points[3] : points[2],
      payWhenRon: isDealer ? points[3] : points[2],
      dealerPayWhenTsumo: 0,
      nonDealerPayWhenTsumo: 0,
    };
  } else {
    return {
      total: isDealer ? points[1] * 3 : points[0] * 2 + points[1],
      payWhenRon: 0,
      dealerPayWhenTsumo: isDealer ? 0 : points[1],
      nonDealerPayWhenTsumo: isDealer ? points[1] : points[0],
    };
  }
}
