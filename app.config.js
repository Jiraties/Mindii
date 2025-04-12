export default ({ config }) => ({
  ...config,
  extra: {
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    TESTING_THREAD: process.env.TESTING_THREAD,
    ASSISTANT_ID: process.env.ASSISTANT_ID,
  },
});
