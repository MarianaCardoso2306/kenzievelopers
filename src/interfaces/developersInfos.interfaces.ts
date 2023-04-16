interface IDeveloperInfos {
  id: number;
  developerSince: Date;
  preferredOS: "Windows" | "Linux" | "MacOS";
  developerId?: number;
}

type IDeveloperInfosResquest = Omit<IDeveloperInfos, "id">;

export { IDeveloperInfos, IDeveloperInfosResquest };
