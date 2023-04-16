import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";

const ensureTechnologyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const technologyName: string = req.body.name;

  const findTechQuery = {
    text: "SELECT * FROM technologies WHERE name = $1",
    values: [technologyName],
  };

  const findTechResult: QueryResult = await client.query(findTechQuery);

  if (findTechResult.rowCount === 0) {
    return res.status(400).json({
      message: "Technology not supported.",
      options: [
        "JavaScript",
        "Python",
        "React",
        "Express.js",
        "HTML",
        "CSS",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ],
    });
  }

  res.locals.technology = findTechResult.rows[0];

  return next();
};

const ensureTechnologyExistsOnProjectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const technologyName: string = req.body.name;
  const projectId: number = parseInt(req.params.id);

  const queryString: string = format(
    `
  SELECT 
    *
  FROM 
    projects_technologies pt 
  JOIN 
    technologies tech 
  ON 
    tech."id" = pt."technologyId"
  WHERE 
    pt."projectId" = %L
  AND 
    tech."name" = %L
  `,
    projectId,
    technologyName
  );

  const queryResult: QueryResult = await client.query(queryString);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({
      message: "This technology is already associated with the project",
    });
  }
  res.locals.technologyId = queryResult.rows[0];

  return next();
};

const ensureTechnologyExistsOnProjectByParamsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const technologyName: string = req.params.name;
  const projectId: number = parseInt(req.params.id);

  const queryString: string = format(
    `
  SELECT 
    *
  FROM 
    projects_technologies pt 
  JOIN 
    technologies tech 
  ON 
    tech."id" = pt."technologyId"
  WHERE 
    pt."projectId" = %L
  AND 
    tech."name" = %L;
  `,
    projectId,
    technologyName
  );

  const queryResult: QueryResult = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    return res.status(400).json({
      message: "Technology not related to the project.",
    });
  }
  res.locals.technology = queryResult.rows[0];
  return next();
};

const ensureTechnologyExistsByParamsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const technologyName: string = req.params.name;

  const findTechQuery = {
    text: "SELECT * FROM technologies WHERE name = $1",
    values: [technologyName],
  };

  const findTechResult: QueryResult = await client.query(findTechQuery);

  if (findTechResult.rowCount === 0) {
    return res.status(400).json({
      message: "Technology not supported.",
      options: [
        "JavaScript",
        "Python",
        "React",
        "Express.js",
        "HTML",
        "CSS",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ],
    });
  }

  res.locals.technology = findTechResult.rows[0];

  return next();
};

export {
  ensureTechnologyExistsMiddleware,
  ensureTechnologyExistsOnProjectMiddleware,
  ensureTechnologyExistsOnProjectByParamsMiddleware,
  ensureTechnologyExistsByParamsMiddleware,
};
