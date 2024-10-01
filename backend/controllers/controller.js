import { getPirate } from "../models/model.js";

export const getPirateById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pirate = getPirate(id);
  if (!pirate) {
    res.status(404).send({ error: `Pirate with ID ${id} not found` });
  } else {
    res.send({ data: pirate });
  }
};

export const welcomeMessage = (req, res) => {
  res.send(`
    <h1>Hello World: Hackathon</h1>
  `);
};
