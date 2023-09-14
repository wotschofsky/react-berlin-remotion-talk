export type Tweet = {
  author_id: string;
  author: Author;
  created_at: Date;
  edit_history_tweet_ids: string[];
  id: string;
  public_metrics: PublicMetrics;
  text: string;
};

type Author = {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
};

type PublicMetrics = {
  impression_count: number;
  like_count: number;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
};


const fetchTweets = async (): Promise<[Tweet, Tweet, Tweet]> => {
  throw new Error('Though luck, this API was paywalled!');
};

export default fetchTweets;
