export const formatNumber = (value) => new Intl.NumberFormat().format(value);

export const millisecondsToSeconds = (value) => value / 1000;
