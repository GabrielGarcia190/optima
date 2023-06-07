import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"


type Props = {
    size: number;
}

const SvgComponent = (props: Props) => (
  <Svg
    width={props.size * 4}
    height={props.size * 3}
    fill="none"
    viewBox="0 0 404 300"
  >
    <G clipPath="url(#a)">
      <Path
        fill="#E00044"
        d="m154.78 179.536 94.665 93.834-24.991 24.29a7.066 7.066 0 0 1-4.924 1.998H59.476c-9.45 0-14.17-11.427-7.467-18.081L154.78 179.536Z"
      />
      <Path
        fill="#FF808C"
        d="m330.585 18.156 37.647 37.242 17.325 16.444c6.935 6.582 2.271 18.247-7.296 18.247h-44.748l-2.928-71.933Z"
      />
      <Path
        fill="#F93D47"
        d="M18.95 47.893c-6.665-6.666-1.937-18.053 7.494-18.053H95.57l197.737 198.621-46.42 47.464L18.949 47.893ZM245.058 90.448l71.833-71.755c6.672-6.665 18.081-1.946 18.081 7.48V180.63l-89.914-90.183Z"
      />
      <Path
        fill="#FF808C"
        d="M95.568 29.84h88.815a10.6 10.6 0 0 1 7.49 3.099l139.745 139.596c5.635 5.629 5.493 14.798-.314 20.25l-38 35.676L95.568 29.84Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.902.631h403.88v299.027H.902z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
