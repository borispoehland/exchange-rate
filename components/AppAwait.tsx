import { IAppErrorResponse, IAppResponse } from "@/lib/fetch";
import { errorLogger } from "@/modules/app/errors/logger";
import { type ReactNode } from "react";

export async function AppAwait<T, R extends IAppResponse<T>>({
  promise,
  children,
}: {
  promise: Promise<R>;
  children: (value: R | IAppErrorResponse) => ReactNode;
}) {
  const data = await promise.catch(async (error) => {
    // next has special prerender errors that should not be catched --> rethrow them
    const isNextError =
      error instanceof Error &&
      "digest" in error &&
      error.digest === "HANGING_PROMISE_REJECTION";
    if (isNextError) {
      throw error;
    } else {
      errorLogger(error);
      return {
        status: "error" as const,
        error: error instanceof Error ? error.message : "Something went wrong",
      };
    }
  });

  return children(data);
}
