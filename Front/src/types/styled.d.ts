// import original module declarations
import "styled-components";
import { ColorType, DeviceType } from "../theme";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorType;
    device: DeviceType;
  }
}
