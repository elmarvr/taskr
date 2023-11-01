import { PropertyValidators, ObjectType } from "convex/values";

type ConvexFunctionArgs<Validator extends PropertyValidators | unknown> = unknown extends Validator
  ? Record<string, unknown>
  : ObjectType<Extract<Validator, PropertyValidators>>;

type MaybePromise<T> = T | Promise<T>;

export type ConvexFunction<Ctx, Output, Validator extends PropertyValidators | unknown> = {
  args?: Validator;
  handler: (ctx: Ctx, args: ConvexFunctionArgs<Validator>) => MaybePromise<Output>;
};
