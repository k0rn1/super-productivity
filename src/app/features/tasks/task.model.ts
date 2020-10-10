import { IssueProviderKey } from '../issue/issue.model';
import { Reminder } from '../reminder/reminder.model';
import { EntityState } from '@ngrx/entity';
import { TaskAttachment } from './task-attachment/task-attachment.model';
import { MODEL_VERSION_KEY } from '../../app.constants';

export enum ShowSubTasksMode {
  HideAll = 0,
  HideDone = 1,
  Show = 2,
}

export enum TaskAdditionalInfoTargetPanel {
  Default = 'Default',
  Attachments = 'Attachments',
}

export type DropListModelSource = 'UNDONE' | 'DONE' | 'BACKLOG';

export interface TimeSpentOnDayCopy {
  [key: string]: number;
}

export interface TaskArchive extends EntityState<ArchiveTask> {
  ids: string[];
  // additional entities state properties
  [MODEL_VERSION_KEY]?: number;
}

export type TimeSpentOnDay = Readonly<TimeSpentOnDayCopy>;

export interface IssueFieldsForTask {
  // NOTE: keep in mind that the issueId is not unique (especially for github)
  issueId: string | null;
  issueType: IssueProviderKey | null;
  issueWasUpdated: boolean | null;
  issueLastUpdated: number | null;
  issueAttachmentNr: number | null;
  issuePoints: number | null;
}

export interface TaskCopy extends IssueFieldsForTask {
  id: string;
  projectId: string | null;
  title: string;

  subTaskIds: string[];
  timeSpentOnDay: TimeSpentOnDay;
  timeSpent: number;
  timeEstimate: number;

  created: number;
  isDone: boolean;
  doneOn: number | null;

  notes: string;

  parentId: string | null;
  reminderId: string | null;
  repeatCfgId: string | null;
  tagIds: string[];

  // attachments
  attachments: TaskAttachment[];

  // ui model
  // 0: show, 1: hide-done tasks, 2: hide all sub tasks
  _showSubTasksMode: ShowSubTasksMode;
}

/**
 * standard task but with:
 * * reminder removed, if any
 * * sub tasks not included (but copied)
 */
// attachment data saved to it
export type ArchiveTask = Readonly<TaskCopy>;

export type Task = Readonly<TaskCopy>;

export interface TaskWithReminderData extends Task {
  readonly reminderData: Reminder;
  readonly parentData?: Task;
}

export interface TaskWithSubTasks extends Task {
  readonly subTasks?: Task[];
}

export const DEFAULT_TASK: Task = {
  id: '',
  projectId: null,
  subTaskIds: [],
  timeSpentOnDay: {},
  timeSpent: 0,
  timeEstimate: 0,
  isDone: false,
  doneOn: null,
  title: '',
  notes: '',
  tagIds: [],
  parentId: null,
  reminderId: null,
  created: Date.now(),
  repeatCfgId: null,

  _showSubTasksMode: ShowSubTasksMode.Show,

  attachments: [],

  issueId: null,
  issuePoints: null,
  issueType: null,
  issueAttachmentNr: null,
  issueLastUpdated: null,
  issueWasUpdated: null,
};


export interface TaskState extends EntityState<Task> {
  // overwrite entity model to avoid problems with typing
  ids: string[];

  // additional entities state properties
  currentTaskId: string | null;
  selectedTaskId: string | null;
  taskAdditionalInfoTargetPanel: TaskAdditionalInfoTargetPanel | null;
  lastCurrentTaskId: string | null;
  isDataLoaded: boolean;

  [MODEL_VERSION_KEY]?: number;
}

export interface WorklogTask extends Task {
  dateStr: string;
}
