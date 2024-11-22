import { BeatLoader } from "react-spinners";
import styled from "@emotion/styled";

import { colors } from "@/configs";

export const Loading = () => {
  return (
    <Wrapper>
      <BeatLoader color={colors.black} size={20} speedMultiplier={1} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
