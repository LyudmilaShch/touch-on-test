<template>
  <div v-if="isLoading" className="contain">Загрузка...</div>
  <div v-else className="contain">
    <div className="contacts-box">
      <h1>Управление контактами</h1>
      <contact-form @add-contact="addContact" @save-contact="confirmChanges" @cancel-edit="updatingContact = undefined"
                    :edit-contact="updatingContact"/>
      <search-query v-model="searchQuery"/>
      <contact-list :contactList="filteredContacts" @update-contact="updateContact" @delete-contact="deleteContact"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref, computed, onBeforeMount} from 'vue';
import ContactList from '@/components/ContactList.vue';
import SearchQuery from '@/components/SearchQuery.vue';
import ContactForm from "@/components/ContactForm.vue";
import {Contact, ContactFormData} from '@/types/types';
import {v4 as uuidv4} from 'uuid';
import {Api} from "@/api/api";

const contacts: Ref<Contact[]> = ref([]);
const searchQuery = ref('');
const updatingContact: Ref<Contact | undefined> = ref();
const isLoading = ref(true);

const filteredContacts = computed(() => {
  return contacts.value.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addContact = (newContact: ContactFormData) => {
  if (newContact.name.trim() && newContact.email.trim() && newContact.phone.trim()) {
    contacts.value.push({id: `${uuidv4()}`, ...newContact});
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
  }
};

const updateContact = (id: string) => {
  updatingContact.value = contacts.value.find((contact: Contact) => contact.id === id);
};

const confirmChanges = (contact: ContactFormData) => {
  contacts.value = contacts.value.map((el) => {
    if (el.id === updatingContact.value?.id) {
      return {
        id: updatingContact.value?.id,
        ...contact
      }
    } else {
      return el
    }
  });
  localStorage.setItem('contacts', JSON.stringify(contacts.value));
  updatingContact.value = undefined;
};

const deleteContact = (id: string) => {
  contacts.value = contacts.value.filter((contact) => contact.id !== id);
  localStorage.setItem('contacts', JSON.stringify(contacts.value));
};

onBeforeMount(async () => {
  isLoading.value = true;

  const storage = localStorage.getItem('contacts');
  if (storage) {
    contacts.value = JSON.parse(storage);
  } else {
    contacts.value = await Api.getContacts();
  }

  isLoading.value = false;
})
</script>

<style>
.contacts-box {
  display: flex;
  flex-direction: column;
  gap: 20px
}
</style>
