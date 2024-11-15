import { BeatLoader } from "react-spinners";
import styled from "@emotion/styled";

import { colors } from "@/configs";

export const Loading = () => {
  return (
    <Wrapper>
      <BeatLoader color={colors.black} size={30} speedMultiplier={1} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
