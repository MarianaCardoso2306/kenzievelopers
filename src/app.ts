import express, { Application } from "express";
import "dotenv/config";
import {
  deleteDeveloper,
  listDeveloperById,
  registerDeveloper,
  updateDeveloper,
} from "./logics/developers.logics";
import {
  ensureDeveloperEmailExistsMiddleware,
  ensureDeveloperExistsMiddleware,
} from "./middlewares/developers.middlewares";
import {
  ensureDeveloperInfosExistsMiddleware,
  ensurepreferedOSisCorrectMiddleware,
} from "./middlewares/developersInfos.middlewares";
import { addDeveloperInfos } from "./logics/developersInfos.logics";
import {
  deleteProject,
  listProjectById,
  registerProject,
  updateProject,
} from "./logics/projects.logics";
import {
  ensureDeveloperExistsForProjectMiddleware,
  ensureProjectExistsMiddleware,
} from "./middlewares/projects.middlewares";
import {
  addTechToProject,
  deleteTechFromProject,
} from "./logics/technologies.logics";
import {
  ensureTechnologyExistsByParamsMiddleware,
  ensureTechnologyExistsMiddleware,
  ensureTechnologyExistsOnProjectByParamsMiddleware,
  ensureTechnologyExistsOnProjectMiddleware,
} from "./middlewares/technologies.middlewares";

const app: Application = express();
app.use(express.json());

app.post(
  "/developers",
  ensureDeveloperEmailExistsMiddleware,
  registerDeveloper
);
app.get("/developers/:id", ensureDeveloperExistsMiddleware, listDeveloperById);
app.patch(
  "/developers/:id",
  ensureDeveloperExistsMiddleware,
  ensureDeveloperEmailExistsMiddleware,
  updateDeveloper
);
app.delete("/developers/:id", ensureDeveloperExistsMiddleware, deleteDeveloper);
app.post(
  "/developers/:id/infos",
  ensureDeveloperExistsMiddleware,
  ensureDeveloperInfosExistsMiddleware,
  ensurepreferedOSisCorrectMiddleware,
  addDeveloperInfos
);

app.post(
  "/projects",
  ensureDeveloperExistsForProjectMiddleware,
  registerProject
);
app.get("/projects/:id", ensureProjectExistsMiddleware, listProjectById);
app.patch(
  "/projects/:id",
  ensureProjectExistsMiddleware,
  ensureDeveloperExistsForProjectMiddleware,
  updateProject
);
app.delete("/projects/:id", ensureProjectExistsMiddleware, deleteProject);
app.post(
  "/projects/:id/technologies",
  ensureProjectExistsMiddleware,
  ensureTechnologyExistsMiddleware,
  ensureTechnologyExistsOnProjectMiddleware,
  addTechToProject
);
app.delete(
  "/projects/:id/technologies/:name",
  ensureProjectExistsMiddleware,
  ensureTechnologyExistsByParamsMiddleware,
  ensureTechnologyExistsOnProjectByParamsMiddleware,
  deleteTechFromProject
);

export default app;
