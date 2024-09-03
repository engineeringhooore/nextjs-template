export type Todo = {
  id: string;
  note: string;
  attachment: string;
};

export type AddTodoState = {
  key: string;
  success: boolean;
  message: string;
  errors: {
    note?: string[] | undefined;
  };
};

export type EditTodoState = {
  key: string;
  success: boolean;
  message: string;
  errors: {
    note?: string[] | undefined;
    attachment?: string[] | undefined;
  };
};
