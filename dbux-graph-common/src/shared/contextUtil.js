import EmptyObject from '@dbux/common/src/util/EmptyObject';
import ThemeMode from './ThemeMode';

/**
 * Generate a unique value between 0 and 359, for any `i`
 */
function getUniqueAngle(i) {
  let color = 0;
  let base = 180;
  while (i !== 0) {
    color += (i % 2) * base;
    i = Math.floor(i / 2);
    base /= 2;
  }
  return color;
}

export function getStaticContextColor(themeMode, staticContextId, { bland = false, highContractMode = false } = EmptyObject) {
  const hue = getUniqueAngle(staticContextId);
  let saturation = bland ? 5 : 35;
  let lightness = ThemeMode.is.Dark(themeMode) ? 30 : 65;

  if (highContractMode) {
    saturation = 80;
    lightness = 80;
  }

  return `hsl(${hue},${saturation}%,${lightness}%)`;
}