import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  border-color: red;
  margin-top: 15%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

function Spinner() {
  const loading = true;
  const color = '#D5DE60';
  const speedMultiplier = 1;

  return (
    <BeatLoader color={color} loading={loading} css={override} size={50} speedMultiplier={speedMultiplier} />
  );
}

export default Spinner;
