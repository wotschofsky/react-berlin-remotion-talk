import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { FC } from 'react';

import type { Tweet } from '../fetchTweets';

type OpinionItemProps = {
  tweet: Tweet;
  startFrame: number;
};

const OpinionItem: FC<OpinionItemProps> = ({ tweet, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const entranceOffset = interpolate(
    spring({
      fps,
      frame,
      delay: startFrame,
      config: {
        stiffness: 60,
      },
      durationInFrames: 30,
    }),
    [0, 1],
    [1000, 0],
  );

  return (
    <div
      className="flex justify-center"
      style={{ transform: `translateY(${entranceOffset}px)`, opacity }}
    >
      <Img
        src={tweet.author.profile_image_url}
        alt={tweet.author.name}
        className="rounded-full bg-white w-16 h-16"
      />

      <div>
        <div className="flex-1 bg-white text-black p-4 rounded-lg ml-4 relative max-w-4xl">
          <span className="text-3xl">{tweet.text}</span>

          {/* Arrow */}
          <div className="absolute left-0 top-6 transform -translate-x-1/2 rotate-45 w-4 h-4 bg-white" />
        </div>

        <p className="text-white text-2xl ml-4 mt-2">
          {tweet.author.name} (@{tweet.author.username})
        </p>
      </div>
    </div>
  );
};

export default OpinionItem;
