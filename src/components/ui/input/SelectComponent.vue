<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Multiselect from '@vueform/multiselect'

type OptionType = {
  label: string | number
  value: string | number
}

const props = defineProps<{
  defaultValue?: string | number | null
  modelValue?: string | number | null
  placeholder?: string
  options?: OptionType[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const multiselectClass = {
  container:
    'relative mx-auto w-full h-10 flex items-center justify-end cursor-pointer rounded-md bg-background text-sm leading-snug outline-none border',
  containerOpen: 'rounded-b-none',
  containerOpenTop: 'rounded-t-none',
  singleLabel:
    'flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-background leading-snug pl-3 pr-16 box-border',
  singleLabelText: 'overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full',
  search:
    'w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-sm font-sans bg-background rounded pl-3',
  caret:
    'bg-multiselect-caret bg-center bg-no-repeat w-6 h-6 py-px box-content mr-2 relative z-10 opacity-80 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none',
  caretOpen: 'rotate-180 pointer-events-auto',
  clear:
    'absolute right-3 z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80',
  clearIcon:
    'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
  dropdown:
    'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border -mt-px overflow-y-scroll z-50 bg-background flex flex-col rounded-md shadow-lg',
  dropdownTop: '-translate-y-full top-px bottom-auto flex-col-reverse rounded-md shadow-lg',
  dropdownHidden: 'hidden',
  options: 'flex flex-col p-0 m-0 list-none',
  optionsTop: 'flex-col-reverse',
  option:
    'flex items-center justify-start box-border text-left cursor-pointer text-sm leading-snug py-2 px-3',
  optionPointed: 'text-foreground bg-blue-500',
  noOptions: 'py-2 px-3 text-muted-foreground bg-background text-center',
  noResults: 'py-2 px-3 text-muted-foreground bg-background text-center',
  spacer: 'h-7 py-px box-content',
  placeholder:
    'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3 text-muted-foreground text-sm'
}

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})
</script>

<template>
  <Multiselect
    ref="multiselect"
    v-model="modelValue"
    :noResultsText="'Data tidak ditemukan.'"
    :noOptionsText="'Sedang memuat data...'"
    :searchable="true"
    :options="props.options"
    :classes="multiselectClass"
    :placeholder="props.placeholder"
  />
</template>
