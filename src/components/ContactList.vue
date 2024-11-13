<template>
  <div>
    <h2>Список контактов</h2>
    <ul class="contact-list">
      <transition-group name="list">
        <li v-for="(contact) in contactList" :key="contact.id" class="contact-item">
          <contact-item :contact="contact" />
          <div class="buttons">
            <button @click="updateContact(contact.id)">Редактировать</button>
            <button @click="deleteContact(contact.id)" class="grey-button">Удалить</button>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, defineEmits } from 'vue';
import { Contact } from '@/types/types';
import ContactItem from './ContactItem.vue';

defineProps({
	contactList: {
		required: true,
		type: Array as PropType<Contact[]>
	},
});

const emit = defineEmits<{
	(e: 'delete-contact', value: string): void,
	(e: 'update-contact', value: string): void
}>();

const deleteContact = (id: string) => {
	emit('delete-contact', id);
};

const updateContact = (id: string) => {
	emit('update-contact', id);
};

</script>

<style lang="css" scoped>
.contact-list {
	display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));
  gap: 20px
}

.contact-item {
  box-shadow: 0 2px 10px 0 rgba(82, 82, 82, 0.6);
  border-radius: 20px;
	padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  word-break: break-all;
}

.buttons {
	display: flex;
  justify-content: center;
	gap: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
