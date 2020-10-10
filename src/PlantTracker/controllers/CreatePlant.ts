import { Router, Request, Response } from "express";

const router = Router();

router.post("/api/plant", (req: Request, res: Response) => {
  res.send("created");
});

export default router;
