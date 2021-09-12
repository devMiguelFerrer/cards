import { app } from "./app";

const initServer = async () => {
  const PORT = process.env.PORT || 7000;
  const server = app.listen(PORT, () =>
    console.info(`Listening on ${PORT} port`)
  );
};

initServer();
