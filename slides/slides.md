---
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: Remotion Talk React Berlin
mdc: true
---


Any application that can be written in JavaScript,

will eventually be written in JavaScript

*~ Jeff Atwood*

---

<img class="m-auto mt-8" src="https://raw.githubusercontent.com/remotion-dev/brand/main/logo.svg" width="250" />

<h1 class="font-bold text-center mt-12">
  Creating Videos with React & Remotion
</h1>

<p class="text-center mt-24">
  Felix Wotschofsky
</p>


---

# How Remotion works

1. Helps build SPA with use-case specific utilities
2. Takes screenshot using headless browser for each frame
3. Renders video using ffmpeg

---

# Register Composition

```ts {all|3|5-18}
import { registerRoot } from 'remotion';

registerRoot(RemotionRoot);

const RemotionRoot: FC = () => {
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

const ReactBerlinComposition: FC = () => null;
```

---
layout: two-cols
---

# Adding content

```ts {1,6-7,9-10|2,4,7|8,12-19}
import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily: interFont } = loadFont();

const Composition: FC = () => (
  <AbsoluteFill className="bg-slate-900" style={{ fontFamily: interFont }}>
    <Intro />
  </AbsoluteFill>
);

const Intro: FC = () => {
  return (
    <AbsoluteFill>
      <svg>React Berlin Logo</svg>
      <h1>happened today!</h1>
    </AbsoluteFill>
  );
};
```

::right::

![](/intro.png)

---
layout: two-cols
---

# Animating

```ts {all|3|2-3,5-10|2-3,5-10,16-18}
const Intro: FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const scaleLogo = spring({
    fps,
    frame,
    config: { stiffness: 100, damping: 100, mass: 0.5 },
    durationInFrames: 15,
  });

  const scaleText = spring({ ... });

  return (
    <AbsoluteFill>
      <svg style={{ transform: `scale(${scaleLogo})` }}>
        React Berlin Logo
      </svg>
      <h1 style={{ transform: `scale(${scaleText})` }}>
        happened today!
      </h1>
    </AbsoluteFill>
  );
};
```

::right::

![](/animation.gif)

---
layout: two-cols
---

# Sequences

```ts  {16-26|7,10|1,5-12}
import { Series } from 'remotion';

const Composition: FC = () => (
  <AbsoluteFill>
    <Series>
      <Series.Sequence durationInFrames={50}>
        <Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={40}>
        <Bridge />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);

const Bridge: FC = () => (
  <AbsoluteFill>
    <h2>
      Here's what people
      <br />
      had to say
    </h2>
  </AbsoluteFill>
);
```

::right::

![](/bridge.png)

---
layout: two-cols
---

# Dynamic data

```ts {all|1,4,24,6|4,24,8-13,17,19-22|1,4,24,15-16,23}
import { continueRender, delayRender } from 'remotion';
import { mock } from 'inatic';

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

  return ...
};
```

::right::

![](/dynamic.gif)

---
layout: two-cols
---

# Images

```ts {1,3,14,6-9}
import { Img } from 'remotion';

const OpinionItem: FC = ({ tweet, startFrame }) => {
  return (
    <div>
      <Img
        src={tweet.author.profile_image_url}
        alt={tweet.author.name}
      />

      {/* Other content */}
    </div>
  );
};
```

::right::

![](/dynamic.gif)

---
layout: two-cols
---

# More dynamic

```ts {1,11,6-8,13-23}
const Composition: FC = () => (
  <AbsoluteFill>
    <Series>
      // Other Sequences

      <Series.Sequence durationInFrames={60}>
        <Outro />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);

const Outro: FC = () => {
  const nextDate = getNextDate();

  return (
    <AbsoluteFil>
      <h2>
        Next Meetup happening on {dateFormatter.format(nextDate)}
      </h2>
    </AbsoluteFil>
  );
};
```

::right::

![](/outro.png)

---

# Audio

```ts {1,3,9,5|10,24,12,22,16-20}
import { Audio, staticFile } from 'remotion';

const Composition: FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile('background.mp3')} volume={0.2} />
    <Series>{/* Sequences here */}</Series>
  </AbsoluteFill>
);

const Opinions: FC = () => (
  <div>
    {data.map((tweet, index, allTweets) => (
      <Fragment key={tweet.id}>
        <OpinionItem tweet={tweet} startFrame={index * 60} />

        {index === allTweets.length - 1 && (
          <Sequence from={index * 60}>
            <Audio src={staticFile('wow.mp3')} />
          </Sequence>
        )}
      </Fragment>
    ))}
  </div>
);
```

---
layout: center
---

# Rendering time!

---
layout: center
---

<img class="rounded-full w-48 mx-auto mb-6" src="https://avatars.githubusercontent.com/u/1629785?v=4" />

# Jonny Burger

---
class: 'bg-[#0b0b0b] text-white'
layout: image
---

<div class="flex flex-col h-full items-center">
  <img class="m-auto" src="/inatic.svg" width="200" alt="Inatic" />
  <img class="m-auto" src="/inatic-example.png" width="600" alt="Inatic Example" />
  <p class="text-4xl">inatic.io</p>
</div>

---

# Thank you

<br>
<br>

## Felix Wotschofsky

<div class="flex items-center">

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shape-rendering="crispEdges" width="150"><path fill="#ffffff" d="M0 0h29v29H0z"/><path stroke="#000000" d="M0 0.5h7m2 0h3m3 0h6m1 0h7M0 1.5h1m5 0h1m2 0h1m1 0h1m8 0h1m1 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h4m2 0h1m1 0h1m2 0h2m1 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m1 0h5m3 0h4m2 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h3m2 0h3m1 0h4m1 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h2m3 0h5m2 0h1m1 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h4m1 0h1m1 0h1m3 0h1M0 8.5h1m1 0h5m5 0h1m1 0h2m1 0h1m4 0h5M1 9.5h3m1 0h1m2 0h3m4 0h10m3 0h1M0 10.5h1m3 0h5m2 0h2m8 0h1m1 0h1M0 11.5h1m1 0h2m1 0h1m2 0h5m1 0h1m1 0h1m1 0h3m1 0h1m1 0h2m1 0h1M1 12.5h2m3 0h2m2 0h2m4 0h2m1 0h1m3 0h1m1 0h2M0 13.5h1m1 0h1m2 0h1m2 0h2m1 0h5m1 0h3m1 0h4m3 0h1M0 14.5h8m2 0h1m1 0h5m1 0h1m1 0h3m1 0h3M0 15.5h2m2 0h1m2 0h1m1 0h1m3 0h1m1 0h1m5 0h1m1 0h2m2 0h1M1 16.5h1m1 0h1m1 0h3m2 0h1m1 0h1m1 0h2m1 0h1m1 0h2m2 0h1m1 0h2M0 17.5h1m3 0h1m2 0h2m2 0h1m3 0h10m1 0h1m1 0h1M0 18.5h1m1 0h1m1 0h5m2 0h1m5 0h1m2 0h1m1 0h2m2 0h1M0 19.5h1m2 0h3m1 0h4m1 0h1m1 0h1m1 0h1m1 0h2m2 0h2m3 0h1M0 20.5h1m1 0h1m2 0h2m3 0h2m4 0h2m1 0h6m1 0h3M8 21.5h2m2 0h4m1 0h2m1 0h1m3 0h5M0 22.5h7m2 0h1m2 0h9m1 0h1m1 0h3M0 23.5h1m5 0h1m1 0h3m1 0h2m1 0h1m3 0h2m3 0h1M0 24.5h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h2m1 0h1m2 0h5m1 0h1m1 0h1M0 25.5h1m1 0h3m1 0h1m1 0h2m1 0h3m1 0h2m2 0h2m4 0h2M0 26.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h2m2 0h2m2 0h7M0 27.5h1m5 0h1m4 0h4m1 0h1m2 0h2m2 0h1m1 0h1m1 0h1M0 28.5h7m1 0h1m3 0h1m5 0h2m1 0h6"/></svg>

  <ul style="list-style: none;">
    <li>
      <carbon-logo-github />
      /wotschofsky
    </li>
    <li>
      <carbon-logo-twitter />
      /wotschofsky
    </li>
    <li>
      <carbon-logo-linkedin />
      /wotschofsky
    </li>
  </ul>

</div>


<br>
<br>


Source code available at
<carbon-logo-github /> wotschofsky/react-berlin-remotion-talk
