export const MoneyFormat = (number) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(number)) >= 1.0e9
    ? Math.abs(Number(number)) / 1.0e9 + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(number)) >= 1.0e6
      ? Math.abs(Number(number)) / 1.0e6 + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(number)) >= 1.0e3
        ? Math.abs(Number(number)) / 1.0e3 + "K"
        : Math.abs(Number(number));
};

export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: true,
    lineWeight: 1,
  },
  animations: {
    duration: 1000,
  },
  maintainAspectRatio: true,
  aspectRatio: 2,
  zIndex: 0,
  responsive: true,
  plugins: {
    tooltip: {
      backgroundColor: "#333",
      padding: "10",
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    x: {
      ticks: {
        source: "data",
      },
      type: "time",
      time: {
        unit: "day",
      },
    },
    y: {},
  },
};
