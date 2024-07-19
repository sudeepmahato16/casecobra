import { Express } from "express";
import { initEdgeStore as initStore } from "@edgestore/server";
import { createEdgeStoreExpressHandler } from "@edgestore/server/adapters/express";

export const initEdgeStore = (app: Express) => {
  const es = initStore.create();
  const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket(),
  });

  const handler = createEdgeStoreExpressHandler({
    router: edgeStoreRouter,
  });

  app.get("/api/v1/edgestore/*", handler);
  app.post("/api/v1/edgestore/*", handler);
};
