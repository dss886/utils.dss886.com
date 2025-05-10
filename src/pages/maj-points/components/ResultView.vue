<script setup lang="ts">
import { ref, watch } from "vue";
import { MahjongPointResult, MahjongPointState, WinningMethod } from "../types/mahjong";
import { calcPoints } from "../utils/calculationUtils";
import { HAN_OPTIONS } from "../utils/constants";

const props = defineProps<{
  state: MahjongPointState;
}>();

const result = ref<MahjongPointResult>({
  total: 0,
  payWhenRon: 0,
  dealerPayWhenTsumo: 0,
  nonDealerPayWhenTsumo: 0,
});

// Calculate points whenever relevant parameters change
watch(
  () => [props.state.isDealer, props.state.winningMethod, props.state.han, props.state.fu],
  () => {
    calculateResult();
  }
);

// Calculate result based on current parameters
const calculateResult = () => {
  result.value = calcPoints(props.state);
};

// Call calculation once on component creation
calculateResult();

const getHanDescription = (han: number) => {
  return (
    HAN_OPTIONS.find((option) => option.value === han)
      ?.label?.replace("<br>", "")
      ?.replace("（", " (")
      ?.replace("）", ")") || han
  );
};
</script>

<template>
  <div class="result-view">
    <h3>计算结果（Result）</h3>

    <div class="total-points">
      <div class="point-label">总点数（Total）</div>
      <div class="point-value">{{ result.total }}</div>
    </div>

    <div class="payment-details">
      <template v-if="props.state.winningMethod === WinningMethod.RON">
        <div class="payment-item">
          <div class="point-label">
            输家支付
            <span v-if="props.state.isDealer">(给庄家)</span>
            <span v-else>(给闲家)</span>
          </div>
          <div class="point-value">{{ result.total }}</div>
        </div>
      </template>

      <template v-else>
        <div v-if="props.state.isDealer" class="payment-item">
          <div class="point-label">每个闲家支付 (Non-dealers pay)</div>
          <div class="point-value">{{ result.nonDealerPayWhenTsumo }}</div>
        </div>

        <template v-else>
          <div class="payment-item">
            <div class="point-label">庄家支付 (Dealer pays)</div>
            <div class="point-value">{{ result.dealerPayWhenTsumo }}</div>
          </div>
          <div class="payment-item">
            <div class="point-label">闲家支付 (Non-dealers pay)</div>
            <div class="point-value">{{ result.nonDealerPayWhenTsumo }}</div>
          </div>
        </template>
      </template>
    </div>

    <div class="calculation-info">
      <div class="info-row">
        <div class="info-label">角色 (Role)</div>
        <div class="info-value">{{ state.isDealer ? "庄家 (Dealer)" : "闲家 (Non-dealer)" }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">和牌方式 (Win)</div>
        <div class="info-value">{{ state.winningMethod === WinningMethod.RON ? "荣和 (Ron)" : "自摸 (Tsumo)" }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">番数 (Han)</div>
        <div class="info-value">{{ getHanDescription(state.han) }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">符数 (Fu)</div>
        <div class="info-value">{{ state.fu }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-view {
  background-color: var(--primary-light);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--card-shadow);
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 500;
  margin-top: -4px;
  margin-bottom: 0.5rem;
}

.total-points {
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.point-label {
  font-size: 1rem;
  opacity: 0.8;
}

.point-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 4px 0;
}

.payment-details {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}

.payment-item {
  flex: 1 1 100%;
  background-color: var(--card-item-background);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .payment-item {
    flex: 1 1 calc(50% - 0.5rem);
  }
}

.calculation-info {
  margin-top: 1rem;
  background-color: var(--card-item-background);
  border-radius: 8px;
  padding: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid var(--card-item-background);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
}
</style>
