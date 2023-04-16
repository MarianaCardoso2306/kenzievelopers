interface IProjectTechnology {
  technologyId: number;
  technologyName: string;
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectEstimatedTime: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate?: Date;
}

export { IProjectTechnology };
