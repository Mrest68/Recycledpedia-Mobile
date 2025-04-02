import { Dimensions, PixelRatio } from "react-native";

const baseWidth = 375;
const baseHeight = 812;

const { width: Screen_Width, height: Screen_Height } = Dimensions.get('window');

const scaleWidth = Screen_Width / baseWidth;
const scaleHeight = Screen_Height / baseHeight;

export const normalize = (size, based = "width") => {
    const scale = based === 'height' ? scaleHeight : scaleWidth;
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
