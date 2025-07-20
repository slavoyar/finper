import { ref } from 'vue';

export const useBaseStore = () => {
  const isLoading = ref(false);
  const isError = ref(false);

  const setError = (message: string) => {
    isError.value = true;
    // TODO: add notification
    console.error(message);
  };

  const resetError = () => {
    isError.value = false;
  };

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const makeRequest = async <T>(
    promise: Promise<T>,
    errorHandler?: (e: unknown) => void
  ): Promise<T | undefined> => {
    let result: T | undefined;
    try {
      setLoading(true);
      result = await promise;
    } catch (e) {
      if (errorHandler) {
        errorHandler(e);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }

    return result;
  };

  return {
    flags: {
      isLoading,
      isError,
    },
    setError,
    setLoading,
    resetError,
    makeRequest,
  };
};
