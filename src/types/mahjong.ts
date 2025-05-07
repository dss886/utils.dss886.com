export interface CalculatorState {
  isDealer: boolean;
  winningMethod: WinningMethod;
  han: number;
  fu: number;
  showFuSelection: boolean;
  result: PointCalculation | null;
}

export enum WinningMethod {
  RON = 'ron',
  TSUMO = 'tsumo'
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

export interface HanOption {
  value: number;
  label: string;
  limitName?: string;
}

export interface FuOption {
  value: number;
  label: string;
}