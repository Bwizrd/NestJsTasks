import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

const mockUser = {username: 'Test user'};

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
});

describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async ()=> {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ]
        }).compile();

        // tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get(TaskRepository);

    })

    describe('Get Tasks', () => {
        it('gets all tasks from repository', ()=> {
         taskRepository.getTasks.mockResolvedValue('someValue');
            expect(taskRepository.getTasks).not.toHaveBeenCalled();  
        })
        // const filters: GetTasksFilterDto = {status: TaskStatus.IN_PROGRESS, search: 'some query search' };
        // tasksService.getTasks(filters, mockUser);
        // expect(taskRepository.getTasks).toHaveBeenCalled();
    })
});
