import { Request, Response } from "express";
import {
  IDeveloper,
  IDeveloperRequest,
} from "../interfaces/developers.interfaces";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const registerDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerData: IDeveloperRequest = req.body;

  const queryString: string = format(
    `
      INSERT INTO
        developers(%I)
      VALUES
        (%L)
      RETURNING *;
    `,
    Object.keys(developerData),
    Object.values(developerData)
  );

  const queryResult: QueryResult<IDeveloper> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const listDeveloperById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
      dev."id" "developerId",
      dev."name" "developerName",
      dev."email" "developerEmail",
      di."developerSince" "developerInfoDeveloperSince",
      di."preferredOS" "developerInfoPreferredOS"
    FROM
      developers dev
    LEFT JOIN
      developer_infos di ON dev."id" = di."developerId"
    WHERE
      dev."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IDeveloper> = await client.query(queryConfig);
  return res.json(queryResult.rows[0]);
};

const updateDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const developerData: Partial<IDeveloperRequest> = req.body;

  const queryString: string = format(
    `
    UPDATE
      developers
    SET(%I) = ROW(%L)
    WHERE
      id = $1
    RETURNING *;
  `,
    Object.keys(developerData),
    Object.values(developerData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IDeveloper> = await client.query(queryConfig);

  return res.json(queryResult.rows[0]);
};

const deleteDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    DELETE FROM
        developers
    WHERE
        id = $1
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);

  return res.status(204).send();
};

export {
  registerDeveloper,
  listDeveloperById,
  updateDeveloper,
  deleteDeveloper,
};
