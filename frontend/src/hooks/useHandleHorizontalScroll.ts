export const handleScroll = (event: React.WheelEvent<HTMLDivElement>): void => {
  const container = event.currentTarget;
  const scrollAmount = event.deltaY;
  container.scrollTo({
    top: 0,
    left: container.scrollLeft + scrollAmount,
    behavior: "smooth",
  });
};
