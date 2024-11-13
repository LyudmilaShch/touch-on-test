<template>
  <div>
    <h2>{{ editContact ? 'Редактирование контакта' : 'Создать контакт' }}</h2>
    <form @submit.prevent="sendContact">
      <input type="text" v-model="contact.name" placeholder="Имя" required/>
      <input type="email" v-model="contact.email" placeholder="Email" required/>
      <input v-maska data-maska="+7 (###)###-##-##" type="tel" v-model="contact.phone" placeholder="Телефон" required/>
      <div class="form__buttons">
        <button type="submit">
          {{ editContact ? 'Сохранить контакт' : 'Добавить контакт' }}
        </button>
        <button v-if="editContact" type="button" @click.prevent="cancelEdit" class="grey-button">Отменить</button>
      </div>

    </form>
  </div>

</template>

<script lang="ts" setup>
import {ref, Ref, defineEmits, watch} from 'vue';
import {ContactFormData} from '@/types/types';
import {defineProps} from "vue/dist/vue";
import {vMaska} from 'maska';

const contact: Ref<ContactFormData> = ref({
  name: '',
  email: '',
  phone: ''
});

const props = defineProps<{
  editContact: ContactFormData | undefined
}>();

const emit = defineEmits<{
  (e: 'add-contact', value: ContactFormData): void
  (e: 'save-contact', value: ContactFormData): void
  (e: 'cancel-edit'): void
}>();

const clearForm = () => {
  contact.value.name = '';
  contact.value.email = '';
  contact.value.phone = '';
}
const sendContact = () => {
  if (props.editContact) {
    emit('save-contact', contact.value);
  } else {
    emit('add-contact', contact.value);
  }
  clearForm();
};
const cancelEdit = () => {
  emit('cancel-edit');
};

watch(() => props.editContact, () => {
  if (props.editContact) {
    contact.value = {...props.editContact}
  } else {
    clearForm()
  }
})
</script>

<style lang="css" scoped>
.form__buttons {
  display: flex;
  justify-content: end;
  gap: 20px
}

</style>
