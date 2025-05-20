import { useState } from "react";
import { ZodSchema } from "zod";

export const useFormWithZod = <T extends Record<string, any>>(schema: ZodSchema<T>) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const validate = (data: T) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors = Object.values(result.error.flatten().fieldErrors) as unknown[];
      const firstError = Array.isArray(fieldErrors[0]) ? (fieldErrors[0] as string[])[0] : undefined;
      setValidationError(firstError || "Dados inválidos.");
      return null;
    }
    setValidationError(null);
    return result.data;
  };

  return { validate, validationError, setValidationError };
};