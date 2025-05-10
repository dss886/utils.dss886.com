import { WinningMethod, PointCalculation, PaymentDetails } from '../types/mahjong';

/**
 * Calculate the points based on the player's role, winning method, han, and fu
 */
export function calculatePoints(
  isDealer: boolean,
  winningMethod: WinningMethod,
  han: number,
  fu: number
): PointCalculation {
  // For limit hands
  if (han >= 5) {
    return calculateLimitHand(isDealer, han);
  }

  // Basic point calculation: fu × 2^(han+2)
  let basicPoints = fu * Math.pow(2, han + 2);
  
  // Round up to the nearest 100 for ron
  if (winningMethod === WinningMethod.RON) {
    basicPoints = Math.ceil(basicPoints / 100) * 100;
    return calculateRonPoints(isDealer, basicPoints);
  } else {
    // Tsumo
    return calculateTsumoPoints(isDealer, basicPoints);
  }
}

/**
 * Calculate points for a ron (winning off someone else's discard)
 */
function calculateRonPoints(isDealer: boolean, basicPoints: number): PointCalculation {
  let paymentAmount = basicPoints;
  
  // 6-han cap
  if (paymentAmount > 12000) {
    paymentAmount = 12000;
  }
  
  // Dealer gets 50% more
  if (isDealer) {
    paymentAmount = paymentAmount * 1.5;
  }
  
  const paymentDetails: PaymentDetails = {
    losingPlayer: paymentAmount
  };
  
  return {
    total: paymentAmount,
    paymentDetails
  };
}

/**
 * Calculate points for a tsumo (self-draw)
 */
function calculateTsumoPoints(isDealer: boolean, basicPoints: number): PointCalculation {
  let total = 0;
  const paymentDetails: PaymentDetails = {};
  
  if (isDealer) {
    // Everyone pays the dealer the same amount
    const payment = Math.ceil(basicPoints / 100) * 100;
    
    // 6-han cap
    const cappedPayment = payment > 4000 ? 4000 : payment;
    
    paymentDetails.nonDealer = cappedPayment;
    total = cappedPayment * 3; // 3 non-dealers pay
  } else {
    // Dealer pays twice what non-dealers pay
    const nonDealerPayment = Math.ceil(basicPoints / 100) * 100 / 2;
    const dealerPayment = nonDealerPayment * 2;
    
    // 6-han cap
    const cappedNonDealerPayment = nonDealerPayment > 2000 ? 2000 : nonDealerPayment;
    const cappedDealerPayment = dealerPayment > 4000 ? 4000 : dealerPayment;
    
    paymentDetails.nonDealer = cappedNonDealerPayment;
    paymentDetails.dealer = cappedDealerPayment;
    
    total = (cappedNonDealerPayment * 2) + cappedDealerPayment; // 2 non-dealers + 1 dealer
  }
  
  return {
    total,
    paymentDetails
  };
}

/**
 * Calculate points for limit hands (5+ han)
 */
function calculateLimitHand(isDealer: boolean, han: number): PointCalculation {
  let paymentDetails: PaymentDetails = {};
  let total = 0;
  
  // Determine hand limit
  if (han >= 13) {
    // Kazoe yakuman (counted yakuman)
    return calculateYakumanPoints(isDealer);
  } else if (han >= 11) {
    // Sanbaiman (triple limit)
    if (isDealer) {
      total = 36000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 12000);
    } else {
      total = 24000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 8000);
    }
  } else if (han >= 8) {
    // Baiman (double limit)
    if (isDealer) {
      total = 24000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 8000);
    } else {
      total = 16000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 5300);
    }
  } else if (han >= 6) {
    // Haneman (1.5x limit)
    if (isDealer) {
      total = 18000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 6000);
    } else {
      total = 12000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 4000);
    }
  } else {
    // Mangan (limit)
    if (isDealer) {
      total = 12000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 4000);
    } else {
      total = 8000;
      paymentDetails = calculateLimitPaymentDetails(isDealer, 2700);
    }
  }
  
  return {
    total,
    paymentDetails
  };
}

/**
 * Calculate payment details for limit hands
 */
function calculateLimitPaymentDetails(isDealer: boolean, basePoints: number): PaymentDetails {
  const details: PaymentDetails = {};
  
  // For ron
  details.losingPlayer = basePoints;
  
  // For tsumo
  if (isDealer) {
    details.nonDealer = basePoints / 3;
  } else {
    details.nonDealer = basePoints / 4;
    details.dealer = basePoints / 2;
  }
  
  return details;
}

/**
 * Calculate points for yakuman (limit hands)
 */
function calculateYakumanPoints(isDealer: boolean): PointCalculation {
  if (isDealer) {
    return {
      total: 48000,
      paymentDetails: {
        losingPlayer: 48000,
        nonDealer: 16000
      }
    };
  } else {
    return {
      total: 32000,
      paymentDetails: {
        losingPlayer: 32000,
        nonDealer: 8000,
        dealer: 16000
      }
    };
  }
}

/**
 * Determine if fu selection is needed based on han
 */
export function isFuSelectionNeeded(han: number): boolean {
  // No fu selection needed for 5+ han (limit hands)
  return han < 5;
}

/**
 * Get available fu options based on han and winning method
 */
export function getAvailableFuOptions(han: number, winningMethod: WinningMethod): number[] {
  // For 1-4 han, fu matters
  if (han < 5) {
    if (winningMethod === WinningMethod.RON) {
      // 30 and up, in increments of 10
      return [30, 40, 50, 60, 70, 80, 90, 100, 110];
    } else {
      // Tsumo starts at 20
      return [20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
    }
  }
  
  // For 5+ han, fu doesn't matter
  return [];
}

/**
 * Get the name of the limit hand based on han count
 */
export function getLimitName(han: number): string {
  if (han >= 13) return "役满 (Yakuman)";
  if (han >= 11) return "三倍满 (Sanbaiman)";
  if (han >= 8) return "倍满 (Baiman)";
  if (han >= 6) return "跳满 (Haneman)";
  if (han >= 5) return "满贯 (Mangan)";
  return "";
}