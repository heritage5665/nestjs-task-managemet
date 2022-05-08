import { TaskStatus } from '../tasks.model';

export class GetTaskFilterDto {
  search?: string;
  status?: TaskStatus;
}
