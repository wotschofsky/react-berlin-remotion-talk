import type { FC } from 'react';
import { AbsoluteFill } from 'remotion';

const getNextDate = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const lastDayOfNextMonth = new Date(
    nextMonth.getFullYear(),
    nextMonth.getMonth() + 1,
    0,
  );

  const date = new Date(lastDayOfNextMonth);
  while (date.getDay() !== 4) {
    date.setDate(date.getDate() - 1);
  }

  // Special one-time change in pattern
  if (
    date.getFullYear() === 2023 &&
    date.getMonth() === 9 &&
    date.getDate() === 26
  ) {
    date.setDate(date.getDate() - 1);
  }

  return date;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const Outro: FC = () => {
  const nextDate = getNextDate();

  return (
    <AbsoluteFill className="flex justify-center items-center">
      <h2 className="text-white text-8xl text-center max-w-[90%]">
        Next Meetup happening on {dateFormatter.format(nextDate)}
      </h2>
    </AbsoluteFill>
  );
};

export default Outro;
