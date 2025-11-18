import { DigestError } from "@/lib/error";

// naive. Send to some service like Grafana later
export function errorLogger(error: Error | DigestError) {
  console.error(
    "error fetching data",
    "digest" in error ? error.digest : error.message
  );
}
