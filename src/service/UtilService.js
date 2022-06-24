
export const handleScroll = () => window.pageYOffset;

export const messages = (severity, summary, detail) => {
  // eslint-disable-next-line no-undef
  toast.current.show({
    severity,
    summary,
    detail,
    life: 3000,
  });
};
