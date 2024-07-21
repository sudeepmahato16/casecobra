import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  name: z
    .string({ message: "Please provide your name!" })
    .min(1, { message: "Please provide your name!" })
    .max(16, { message: "Name should be no longer than 16 characters." }),

  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email(),

  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export type SignInFormData = z.infer<typeof SignInSchema>;

enum OrderStatus {
  "fulfilled",
  "shipped",
  "awaiting_shipment",
}

enum PhoneModel {
  "iphonex",
  "iphone11",
  "iphone12",
  "iphone13",
  "iphone14",
  "iphone15",
}

enum CaseMaterial {
  "silicone",
  "polycarbonate",
}

enum CaseFinish {
  "smooth",
  "textured",
}

enum CaseColor {
  "black",
  "blue",
  "rose",
}

export type Configuration = {
  id: string;
  width: number;
  height: number;
  imageUrl: string;
  color: CaseColor | null;
  model: PhoneModel | null;
  material: CaseMaterial | null;
  finish: CaseFinish | null;
  croppedImageUrl: string | null;
};
