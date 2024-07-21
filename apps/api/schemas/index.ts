import { ObjectSchema } from "joi";
import { authSchema } from "./auth";
import { configurationSchema } from "./configure";

export default {
  ...authSchema,
  ...configurationSchema,
} as { [key: string]: ObjectSchema };

export type SchemaName =
  | "signin"
  | "signup"
  | "createConfiguration"
  | "updateConfiguration";
