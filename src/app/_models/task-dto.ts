import { CategoryDto } from './category-dto';
import { UserDto } from './user-dto';

export class TaskDto {
    id: number;
    label: string;
    priority: string;
    deadline: string;
    category: CategoryDto;
    state:number;
    users:UserDto;
}