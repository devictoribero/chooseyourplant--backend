import { Router, Request, Response } from "express";

const router = Router();
const alocasiaAmazonica = {
  slug: "alocasia-amazonica",
  latin_name: "Alocasia Amazonica",
  most_common_name: "Alocasia Amazonica",
};

const alocasisaMelo = {
  slug: "alocasia-rugosa",
  latin_name: "Alocasia Melo",
  most_common_name: "Alocasia rugosa",
};

const plants = [alocasiaAmazonica, alocasisaMelo];

router.get("/api/plants", (req: Request, res: Response) => {
  res.send(plants);
});

export default router;
