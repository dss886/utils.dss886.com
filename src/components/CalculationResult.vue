<script setup lang="ts">
import { PointCalculation, WinningMethod } from "../types/mahjong";

defineProps<{
  result: PointCalculation | null;
  isDealer: boolean;
  winningMethod: WinningMethod;
  han: number;
  fu: number;
}>();
</script>

<template>
  <div v-if="result" class="calculation-result card">
    <h3>计算结果 (Result)</h3>

    <div class="total-points">
      <div class="point-label">总点数 (Total)</div>
      <div class="point-value">{{ result.total }}</div>
    </div>

    <div class="payment-details">
      <template v-if="winningMethod === WinningMethod.RON">
        <div class="payment-item">
          <div class="point-label">
            输家支付
            <span v-if="isDealer">(给庄家)</span>
            <span v-else>(给闲家)</span>
          </div>
          <div class="point-value">{{ result.paymentDetails.losingPlayer }}</div>
        </div>
      </template>

      <template v-else>
        <div v-if="isDealer" class="payment-item">
          <div class="point-label">每个闲家支付 (Non-dealers pay)</div>
          <div class="point-value">{{ result.paymentDetails.nonDealer }}</div>
        </div>

        <template v-else>
          <div class="payment-item">
            <div class="point-label">庄家支付 (Dealer pays)</div>
            <div class="point-value">{{ result.paymentDetails.dealer }}</div>
          </div>
          <div class="payment-item">
            <div class="point-label">闲家支付 (Non-dealers pay)</div>
            <div class="point-value">{{ result.paymentDetails.nonDealer }}</div>
          </div>
        </template>
      </template>
    </div>

    <div class="calculation-info">
      <div class="info-row">
        <div class="info-label">角色 (Role):</div>
        <div class="info-value">{{ isDealer ? "庄家 (Dealer)" : "闲家 (Non-dealer)" }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">和牌方式 (Win):</div>
        <div class="info-value">{{ winningMethod === WinningMethod.RON ? "荣和 (Ron)" : "自摸 (Tsumo)" }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">番数 (Han):</div>
        <div class="info-value">{{ han }}</div>
      </div>
      <div v-if="fu > 0" class="info-row">
        <div class="info-label">符数 (Fu):</div>
        <div class="info-value">{{ fu }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculation-result {
  background-color: var(--primary-light);
  color: white;
  animation: highlight 0.5s ease-out;
}

@keyframes highlight {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.total-points {
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.point-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 4px 0;
}

.payment-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
}

.payment-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calculation-info {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
}

.point-label {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
