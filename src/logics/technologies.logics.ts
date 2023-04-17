import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IProjectTechnology } from "../interfaces/technologies.interfaces";

const addTechToProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId: number = parseInt(req.params.id);

  const technologyId = res.locals.technology.id;

  const values = [new Date(), technologyId, projectId];

  const queryString: string = format(
    `
      INSERT INTO
        projects_technologies("addedIn", "technologyId", "projectId")
      VALUES
        (%L)
        RETURNING *;
    `,
    values
  );

  const queryResult: QueryResult<IProjectTechnology> = await client.query(
    queryString
  );

  const projectQueryString: string = format(
    `
      SELECT
        t.id AS "technologyId",
        t.name AS "technologyName",
        p.id AS "projectId",
        p.name AS "projectName",
        p.description AS "projectDescription",
        p."estimatedTime" AS "projectEstimatedTime",
        p.repository AS "projectRepository",
        p."startDate" AS "projectStartDate",
        p."endDate" AS "projectEndDate"
      FROM
        projects_technologies pt
        INNER JOIN projects p ON pt."projectId" = p.id
        INNER JOIN technologies t ON pt."technologyId" = t.id
      WHERE
        p.id = $1
        AND t.id = $2
    `
  );

  const queryConfig: QueryConfig = {
    text: projectQueryString,
    values: [projectId, technologyId],
  };

  const projectResult: QueryResult = await client.query(queryConfig);
  return res.status(201).json(projectResult.rows[0]);
};

const deleteTechFromProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId: number = parseInt(req.params.id);

  const technologyId: number = parseInt(res.locals.technology.id);

  const queryString: string = format(`
    DELETE FROM
      projects_technologies
    WHERE
      "projectId" = $1
    AND
      "technologyId" = $2
    ;
  `);

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId, technologyId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  return res.status(204).send();
};

export { addTechToProject, deleteTechFromProject };
