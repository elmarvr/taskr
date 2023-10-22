import { Schema } from "zod";
import { FieldValues, UseFormProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useValidatedForm<TSchema extends Schema<FieldValues>>({
  schema,
  ...props
}: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
  schema: TSchema;
}) {
  return useForm<TSchema["_input"], unknown, TSchema["_output"]>({
    ...props,
    resolver: zodResolver(schema),
  });
}
