export const useCurrentFrame = () => {
  const params = new URLSearchParams(window.location.search);
  const value = params.get('frame');

  return value ? parseInt(value) : 0;
};
