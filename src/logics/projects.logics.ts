import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IProject, IProjectRequest } from "../interfaces/projects.interfaces";

const registerProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectData: IProjectRequest = req.body;

  const queryString: string = format(
    `
      INSERT INTO
        projects(%I)
      VALUES
        (%L)
      RETURNING *;
    `,
    Object.keys(projectData),
    Object.values(projectData)
  );

  const queryResult: QueryResult<IProject> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const listProjectById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
      pro."id" "projectId",
      pro."name" "projectName",
      pro."description" "projectDescription",
      pro."estimatedTime" "projectEstimatedTime",
      pro."repository" "projectRepository",
      pro."startDate" "projectStartDate",
      pro."endDate" "projectEndDate",
      pro."developerId" "projectDeveloperId",
      pt."technologyId",
      tech."name" as "technologyName"
    FROM
      projects pro
    LEFT JOIN
      projects_technologies pt ON pro."id" = pt."projectId"
    LEFT JOIN
      technologies tech ON pt."technologyId" = tech."id"
    WHERE
      pro."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IProject> = await client.query(queryConfig);
  return res.json(queryResult.rows);
};

const updateProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const projectData: Partial<IProjectRequest> = req.body;

  const queryString: string = format(
    `
    UPDATE
      projects
    SET(%I) = ROW(%L)
    WHERE
      id = $1
    RETURNING *;
  `,
    Object.keys(projectData),
    Object.values(projectData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IProject> = await client.query(queryConfig);

  return res.json(queryResult.rows[0]);
};

const deleteProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    DELETE FROM
        projects
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

export { registerProject, listProjectById, updateProject, deleteProject };
