import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_APP_API_BACKEND_URL}/api/v1/contact/manual-user/create/`,
      {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        contact_email: req.body.contact_email,
        mobile_number: req.body.mobile_number,
        photo_url: req.body.photo_url,
      }
    )
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
