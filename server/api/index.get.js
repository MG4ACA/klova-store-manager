export default defineEventHandler(async (event) => {
  return {
    message: "Klova Store Manager API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
});
