<template>
  <div>
    <h2>Поиск контактов</h2>
    <input type="text" v-model="modelValue" placeholder="Поиск по имени" />
  </div>
</template>

<script lang="ts" setup>
import {defineModel} from 'vue';

const modelValue = defineModel<string>();

</script>

<style lang="css" scoped></style>
