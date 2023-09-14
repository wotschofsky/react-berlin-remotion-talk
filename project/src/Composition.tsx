import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { FC } from 'react';

import Intro from './components/Intro';

const { fontFamily: interFont } = loadFont();

const Composition: FC = () => (
  <AbsoluteFill className="bg-slate-900" style={{ fontFamily: interFont }}>
    <Intro />
  </AbsoluteFill>
);

export default Composition;
