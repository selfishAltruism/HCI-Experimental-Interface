import { BeatLoader } from "react-spinners";

import { colors } from "@/configs";

export const Loading = () => {
  return (
    <>
      <BeatLoader color={colors.black} size={30} speedMultiplier={1} />
    </>
  );
};
