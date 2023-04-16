interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

type IDeveloperRequest = Omit<IDeveloper, "id">;

export { IDeveloper, IDeveloperRequest };
