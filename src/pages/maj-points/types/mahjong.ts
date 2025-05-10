export interface CalculatorState {
  isDealer: boolean;
  winningMethod: WinningMethod;
  han: number;
  fu: number;
  showFuSelection: boolean;
  result: PointCalculation | null;
}

export interface PointCalculation {
  total: number;
  paymentDetails: PaymentDetails;
}

export interface PaymentDetails {
  // For ron
  losingPlayer?: number;

  // For tsumo
  dealer?: number;
  nonDealer?: number;
}

export interface MahjongPointState {
  isDealer: boolean;
  winningMethod: WinningMethod;
  han: number;
  fu: number;
}

export interface MahjongPointResult {
  total: number;
  payWhenRon: number;
  dealerPayWhenTsumo: number;
  nonDealerPayWhenTsumo: number;
}

export enum WinningMethod {
  RON = "ron",
  TSUMO = "tsumo",
}

export interface SelectOption<T extends boolean | string | number> {
  value: T;
  label: string;
}
