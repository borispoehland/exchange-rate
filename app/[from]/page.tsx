import { AppError } from "@/components/AppError";
import { AppLoading } from "@/components/AppLoading";
import { AppAwait } from "@/components/AppAwait";
import { getMetaTitle } from "@/lib/metadata";
import { awaitParams } from "@/lib/params";
import { IWithGenericParams } from "@/lib/types";
import { CurrencyConverter } from "@/modules/app/components/CurrencyConverter";
import { CurrencyHistory } from "@/modules/app/components/CurrencyHistory";
import { currencies, CurrencySchema } from "@/modules/app/schemas/currency";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { safeParse } from "zod";

type IProps = IWithGenericParams<{ from: string }>;

export async function generateMetadata({ params }: IProps) {
  const { from } = await params;
  const result = safeParse(CurrencySchema, from);
  if (!result.success) {
    return notFound();
  }
  return {
    title: getMetaTitle({ currency: result.data }),
  };
}

export function generateStaticParams() {
  return currencies.map((item) => {
    return { from: item };
  });
}

export default function Page({ params }: IProps) {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppAwait promise={awaitParams({ params })}>
        {(data) => {
          if (data.status === "error") {
            return <AppError error={data.error} />;
          }
          const result = safeParse(CurrencySchema, data.data.from);
          if (!result.success) {
            return notFound();
          }
          return (
            <>
              <CurrencyConverter fromCurrency={result.data} />
              <CurrencyHistory fromCurrency={result.data} />
            </>
          );
        }}
      </AppAwait>
    </Suspense>
  );
}
