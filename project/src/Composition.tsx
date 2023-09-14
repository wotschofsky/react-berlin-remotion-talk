import { AbsoluteFill, Series } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { FC } from 'react';

import Bridge from './components/Bridge';
import Intro from './components/Intro';
import Opinions from './components/Opinions';
import Outro from './components/Outro';

const { fontFamily: interFont } = loadFont();

const Composition: FC = () => (
  <AbsoluteFill className="bg-slate-900" style={{ fontFamily: interFont }}>
    <Series>
      <Series.Sequence durationInFrames={50}>
        <Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={40}>
        <Bridge />
      </Series.Sequence>
      <Series.Sequence durationInFrames={200}>
        <Opinions />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Outro />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);

export default Composition;
