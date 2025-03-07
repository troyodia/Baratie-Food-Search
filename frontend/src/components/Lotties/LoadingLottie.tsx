import { memo, useRef } from "react";
import Lottie from "react-lottie";

type LottieProps = {
  animationData: object;
};
function LoadingLottie({ animationData }: LottieProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const ref = useRef(null);
  return (
    <Lottie
      options={defaultOptions}
      height={350}
      width={350}
      isClickToPauseDisabled={true}
      ref={ref}
    />
  );
}
export default memo(LoadingLottie);
