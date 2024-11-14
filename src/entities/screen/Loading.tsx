import { BeatLoader } from "react-spinners";

import { colors } from "@/configs";

export const Loading = () => {
  return (
    <>
      <BeatLoader color={colors.navy} size={30} speedMultiplier={1} />
    </>
  );
};
