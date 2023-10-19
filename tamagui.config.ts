import { config as configPreset } from "@tamagui/config/v2-reanimated";
import { createTamagui } from "tamagui";

const config = createTamagui(configPreset);

// this makes typescript properly type everything based on the config
type Config = typeof config;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Config {}
}

export default config;
