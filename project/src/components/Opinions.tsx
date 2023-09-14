import { type FC, useCallback, useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { mock } from 'inatic/bundlers';

import fetchTweets, { Tweet } from '../fetchTweets';
import OpinionItem from './OpinionItem';

const Opinions: FC = () => {
  const [data, setData] = useState<Tweet[]>([]);

  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    const data = await mock<Tweet[]>(
      'Tweets about #ReactBerlin Meetup talking about how great the event was; profile_image_url should follow format https://api.dicebear.com/7.x/adventurer/png?seed=[random]',
      { length: 3 },
      () => fetchTweets(),
    );

    setData(data);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col align-middle justify-center gap-8 h-full">
        {data.map((tweet, index) => (
          <OpinionItem key={tweet.id} tweet={tweet} startFrame={index * 60} />
        ))}
      </div>
    </div>
  );
};

export default Opinions;
