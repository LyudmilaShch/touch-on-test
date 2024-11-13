<template>
  <div>
    <div>
      <span class="bold">Имя: </span>
      <span>{{ contact.name }} </span>
    </div>
    <div>
      <span class="bold">Email: </span>
      <span>{{ contact.email }} </span>
    </div>
    <div>
      <span class="bold">Телефон: </span>
      <span>{{ contact.phone }} </span>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {defineProps} from 'vue';
import {Contact} from '@/types/types';

defineProps<{
  contact: Contact
}>();


</script>

<style lang="css" scoped>

</style>
