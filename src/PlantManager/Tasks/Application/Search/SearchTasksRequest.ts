export type SearchTasksRequest = {
  from?: Date;
  to?: Date;
  type?: string,
  status?: string,
  plantId?: string
};
