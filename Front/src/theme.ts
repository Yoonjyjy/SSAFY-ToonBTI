const colors = {
  yellowbg: "#FFF8E8",
  yellow: "#FFD77C",
  orange: "#FFB202",
  kakao: "#FFBC00",
  green: "#2DB400",
  pink: "#FF6C6C",
  blue: "#1E9EFF",
};
const deviceSizes = {
  desktop: "1920px",
  laptop: "1280px",
  tablet: "1023px",
};
const device = {
  desktop: `screen and (min-width: ${deviceSizes.desktop})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
};
const theme = {
  colors,
  device,
};

export default theme;
