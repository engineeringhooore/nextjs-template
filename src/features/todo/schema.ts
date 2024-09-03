import { z } from "zod";

export const addTodoSchema = z.object({
  note: z.string(),
});

export const editTodoSchema = z.object({
  note: z.string(),
  attachment: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= 1024 * 1024 * 3; // 3MB;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return ["image/jpeg"].includes(file.type);
    }, "File must be a jpeg"),
});
