import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IDeveloper } from "../interfaces/developers.interfaces";
import { client } from "../database";

const ensureDeveloperInfosExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const developerId: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
      *
    FROM
      developer_infos
    WHERE
      "developerId" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: QueryResult<IDeveloper> = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({
      message: "Developer infos already exists.",
    });
  }
  return next();
};

const ensurepreferedOSisCorrectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const preferredOS = req.body.preferredOS;

  if (!["Windows", "Linux", "MacOS"].includes(preferredOS)) {
    return res.status(400).json({
      message: "Invalid OS option.",
      options: ["Windows", "Linux", "MacOS"],
    });
  }
  return next();
};

export {
  ensureDeveloperInfosExistsMiddleware,
  ensurepreferedOSisCorrectMiddleware,
};
