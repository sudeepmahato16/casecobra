import { ObjectSchema } from "joi";
import { authSchema } from "./auth";

export default {
  ...authSchema,
} as { [key: string]: ObjectSchema };

export type SchemaName = "signin" | "signup";
