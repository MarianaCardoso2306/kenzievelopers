interface IProject {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate?: Date;
  developerId: number;
}

type IProjectRequest = Omit<IProject, "id">;

export { IProject, IProjectRequest };
