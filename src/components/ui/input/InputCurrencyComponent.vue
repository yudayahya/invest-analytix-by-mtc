<script setup lang="ts">
import { watch, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useCurrencyInput, CurrencyDisplay } from 'vue-currency-input'

const props = defineProps<{
  modelValue: number | null
  class?: HTMLAttributes['class']
  currency: string
}>()

const { inputRef, formattedValue, setValue } = useCurrencyInput({
  currency: props.currency ?? 'IDR',
  currencyDisplay: CurrencyDisplay.narrowSymbol,
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: false,
  useGrouping: true,
  accountingSign: true
})

watch(
  () => props.modelValue,
  (value) => setValue(value)
)
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    v-model="formattedValue"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class ?? ''
      )
    "
  />
</template>
