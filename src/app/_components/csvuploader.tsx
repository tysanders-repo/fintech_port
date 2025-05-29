"use client";

import { useCallback } from "react";
import { api } from "~/trpc/react";
import Papa from "papaparse";

const userId = "dev_tmp";
const bankAccountId = "dev_bank_tmp";

export function CSVUploader() {
  // 1) useMutation at top level
  const mutation = api.transaction.pushTransactions.useMutation();

  const handleTransactionInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.name.endsWith(".csv")) {
        console.error("Only .csv files are accepted.");
        return;
      }

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          // Map the parsed data to the expected format
          const rows = (results.data as any[]).map((row) => ({
            amount: row["Amount"],
            balance: row["Balance"],
            description: row["Description"],
          }));

          mutation.mutate({
            bankAccountId,
            rows,
          });
        },
        error: (err) => {
          console.error("CSV parse failed:", err);
        },
      });
    },
    [mutation]
  );

  return (
    <section className="p-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleTransactionInput}
        className="border rounded p-2"
      />
      {mutation.isPending && <p>Uploading transactions…</p>}
      {mutation.isError && (
        <p className="text-red-600">Error: {mutation.error.message}</p>
      )}
    </section>
  );
}
