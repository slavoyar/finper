import { ref } from 'vue';

export const useModal = <T>() => {
  const isOpen = ref(false);
  const isValid = ref(false);
  const data = ref<Partial<T>>({});

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
    isValid.value = false;
    data.value = {};
  };

  return {
    isOpen,
    isValid,
    data,
    open,
    close,
  };
};
