import { Composition } from 'remotion';
import type { FC } from 'react';

import ReactBerlinComposition from './Composition';
import './style.css';

export const RemotionRoot: FC = () => {
  return (
    <>
      <Composition
        id="ReactBerlin"
        component={ReactBerlinComposition}
        durationInFrames={360}
        fps={30}
        width={1280}
        height={1024}
      />
    </>
  );
};
