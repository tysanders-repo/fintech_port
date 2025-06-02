"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Input} from "~/components/ui/input"
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import Papa from "papaparse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Button } from "~/components/ui/button";


type FileInput = FileList | null;


const FormSchema = z.object({
  bankName:    z.string()
                .min(2, "Bank name must be at least 2 characters long"),
  
  roundUp:     z.number()
                .positive("Round up must be a positive value")
                .int("Round up must be a whole number"),

  savingsGoal: z.number()
                .positive("Savings goal must be a positive value")
                .int("Savings goal must be a whole number"),

  csvFile:     z.custom<FileInput>()
                .refine((files) => files && files.length > 0, "CSV file is required.")
                .refine((files) => files && files[0]?.type === "text/csv",
                        "Only .csv files are accepted.")
})


export function OnboardingForm() {
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bankName: "",
      roundUp: 1,
      savingsGoal: 1000,
      csvFile: null,
    },
  })

  const pushTransactionsMutation = api.transaction.pushTransactions.useMutation();
  const createBankEntryMutation = api.bank.create.useMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Form data:", data);

    try {
      if (!session?.user.id) {
        throw new Error("User ID is missing from session.");
      }

      const { success: bankSuccess, bankId } = await createBankEntryMutation.mutateAsync({
        bankName: data.bankName,
        userId: session.user.id
      })
    

    const file = data.csvFile?.[0];

    if (file) {
      if (!bankId) {
        form.setError("csvFile", {
          type: "manual",
          message: "Bank account creation failed. Please try again.",
        });
        return;
      }
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          const rows = (results.data as any[]).map((row) => ({
            amount: row["Amount"],
            balance: row["Balance"],
            description: row["Description"],
          }));

          pushTransactionsMutation.mutate(
            {
              bankAccountId: bankId,
              rows,
            },
            {
              onSuccess: () => {
                console.log("Transactions uploaded successfully!");
                // You might want to reset the form or show a success message here
              },
              onError: (error) => {
                console.error("Failed to upload transactions:", error);
              },
            },
          );
        },
        error: (err) => {
          console.error("CSV parse failed:", err);
          form.setError("csvFile", {
            type: "manual",
            message: "CSV parsing error. Please check your file.",
          });
        },
      });
    }

  } catch(error: any) {
    console.log("onboarding failed with error:", error);
  }
  };

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="bank inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roundUp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Round Up</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1" prefix="$" {...field} />
              </FormControl>
              <FormDescription>
                This is the amount you'd like us to round up to, for automatic savings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="savingsGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Round Up</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1000" prefix="$" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="csvFile"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Round Up</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={(e) => onChange(e.target.files)}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                Upload a CSV file containing your bank transactions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      <Button type="submit" disabled={pushTransactionsMutation.isPending}>
          {pushTransactionsMutation.isPending ? "Submitting..." : "Submit"}
      </Button>
      </form>
    </Form>
  );
}