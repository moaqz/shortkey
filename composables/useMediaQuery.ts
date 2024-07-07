export function useMediaQuery(query: string) {
  const matches = ref(false);
  let mediaQuery: MediaQueryList | undefined;

  function handler() {
    if (mediaQuery) {
      matches.value = mediaQuery.matches;
    }
  };

  onMounted(() => {
    if (window.matchMedia) {
      mediaQuery = window.matchMedia(query);
      handler();
      mediaQuery.addEventListener("change", handler);
    }
  });

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener("change", handler);
    }
  });

  return matches;
}
