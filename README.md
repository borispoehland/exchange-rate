# 1. Bootstrapping

- Bootstrap new Next.js project via npx create-next-app@canary exchange-rates
- Enable reactCompiler and cacheComponents in next.config.ts
- Install shadcn for UI components via npx shadcn init && npx shadcn add --all

# 2. Data modelling

- type the API's return type and schemas in modules/app/schemas
- create a fetch helper in lib/fetch.ts that types and validates the response
- create the specific fetchers in modules/app/api

# 3. Data fetching

- Add a helper component AppAwait in components for centralized error reporting, consistent return types and isolated "await"-ing
- Fetch the data on the server with an ISR of 5 minutes in app/components/CurrencyConverter and app/components/CurrencyHistory
- prerender all the 3 currencies for instant responses in app/[from]/page.tsx. When changing the currency via the dropdown, redirect to /[from]

# 4. Client side interactivity

- Render a form in app/components/CurrencyConverter/client.tsx for currency conversions. Create helper components/AppNumberInput.tsx to render an input where numbers are enforced. No submissions necessary, but render it as react-hook-form regardless. Could easily be changed to not use react-hook-form and use a "useState" for the amount instead, but more robust and scalable this way
- Render a chart in app/components/CurrencyHistory/client.tsx for displaying the 14d history, with the possibility to toggle the visibility of currencies by clicking them

# 5. Error and Loading Handling

- We only fetch data on the server, and handle loading and error state there via Suspense and AppError
- If we would pipe the server-delivered, 5-minute old data into a Tanstack useQuery or Vercel useSWR as fallbackData, we would have even fresher data because every time the client enters the page it would re-fetch the data on the client. In that case we wouldn't have to handle loading states (because fallbackData makes sure there's always data), but perhaps revalidation state (`isFetching` / `isRevalidating`) and error states via AppError

# 6. Considerations

- If freshness of data would absolutely be crucial and there can be no 5 minute delay, keep the ISR for quick responses from CDN and refetch the data on the client with Tanstack Query or SWR
- In real world apps, send the errors catched by AppAwait to Grafana or similar by modifying app/errors/logger.ts
- In real world apps, we could type the errors better. Right now an error is thrown when zod can't validate the response structure. So if we expect an object but get an HTML rate limit reached response, we rightfully throw an error, but the user won't know that it's due to rate limit (He will read something like "Expected object, received string"). So to further improve it for the future, one could revamp the IAppErrorResponse from lib/fetch.ts to contain one human-readable error ("Too many requests, please try again later") and one internal error for Grafana ("Expected object, received string" together with the response text as payload)
