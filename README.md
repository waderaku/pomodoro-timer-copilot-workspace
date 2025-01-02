# pomodoro-timer-copilot-workspace

## Supabase Table Design

The `tasks` table in Supabase is designed as follows:

- `id`: A unique identifier for each task (UUID or serial).
- `title`: The name or title of the task (text).
- `description`: Additional details about the task (text).
- `parent_id`: The `id` of the parent task to establish the hierarchical relationship (UUID or serial, nullable).
- `created_at`: The timestamp when the task was created (timestamp).
- `updated_at`: The timestamp when the task was last updated (timestamp).
- `completed`: A boolean value indicating whether the task is completed or not (boolean).
- `timer_duration`: The duration of the Pomodoro timer associated with the task (integer, in minutes).
