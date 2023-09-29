import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  axios
    .get(`${process.env.NEXT_PUBLIC_APP_API_BACKEND_URL}/api/v1/maps/polygon/`)
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      if (
        error.response != undefined &&
        error.response.status != undefined &&
        error.response.data != undefined
      ) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send(error);
      }
    });
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
