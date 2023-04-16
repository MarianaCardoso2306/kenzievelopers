import { Request, Response } from "express";
import {
  IDeveloperInfos,
  IDeveloperInfosResquest,
} from "../interfaces/developersInfos.interfaces";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";

const addDeveloperInfos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerInfosData: IDeveloperInfosResquest = req.body;
  developerInfosData.developerId = parseInt(req.params.id);

  const queryString: string = format(
    `
      INSERT INTO
        developer_infos(%I)
      VALUES
      (%L)
      RETURNING *;
    `,
    Object.keys(developerInfosData),
    Object.values(developerInfosData)
  );

  const queryResult: QueryResult<IDeveloperInfos> = await client.query(
    queryString
  );

  return res.status(201).json(queryResult.rows[0]);
};

export { addDeveloperInfos };
