import { onMounted, onUnmounted, ref } from 'vue';

export function useIsMobile(breakpoint = 768) {
  const isMobile = ref(false);

  const checkMobile = () => {
    isMobile.value = window.outerWidth <= breakpoint;
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });

  return isMobile;
}
