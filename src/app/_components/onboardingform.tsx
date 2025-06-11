"use client";

import { coerce, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
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
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Progress } from "~/components/ui/progress";
import { useState } from "react";

type FileInput = FileList | null;

const FormSchema = z.object({
	bankName: z.string().min(2, "Bank name must be at least 2 characters long"),

	roundUp: z.coerce
		.number()
		.positive("Round up must be a positive value")
		.int("Round up must be a whole number"),

	savingsGoal: z.coerce
		.number()
		.positive("Savings goal must be a positive value")
		.int("Savings goal must be a whole number"),

	csvFile: z
		.custom<FileInput>()
		.refine((files) => files && files.length > 0, "CSV file is required.")
		.refine(
			(files) =>
				files &&
				files.length > 0 &&
				(files[0]?.type === "text/csv" ||
					(files[0]?.name && files[0].name.toLowerCase().endsWith(".csv"))),
			"Only .csv files are accepted.",
		),
});

export function OnboardingForm() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [progress, setProgress] = useState(0);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			bankName: "",
			roundUp: 1,
			savingsGoal: 1000,
			csvFile: null,
		},
	});

	/*  
    1. create bank
    2. set savings goal and round up pref.
    3. upload transactions
    4. process round ups
  */

	const createBankEntryMutation = api.bank.create.useMutation();
	const modifyUserPreferencesMutation = api.user.update.useMutation();
	const pushTransactionsMutation = api.transaction.pushTransactions.useMutation();
	const createMultipleRoundUpMutation = api.roundUp.createMultiple.useMutation();

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {

		try {
			if (!session?.user.id) {
				throw new Error("User ID is missing from session.");
			}

			//Create user's first bank
			const { success: bankSetupSuccess, bankId } =
				await createBankEntryMutation.mutateAsync({
					bankName: data.bankName,
					userId: session.user.id,
				});

			if (bankSetupSuccess) {
				setProgress(20);
			} else {
				throw new Error("Unable to create bank");
			}

			// Update User's Savings and Round up preferences
			const { success: userPrefSuccess } =
				await modifyUserPreferencesMutation.mutateAsync({
					roundUp: data.roundUp,
					savingsGoal: data.savingsGoal,
				});

			if (userPrefSuccess) {
				setProgress(40);
			} else {
				throw new Error(
					"Unable to update user preferences to new roundup/savings goal",
				);
			}

			// Handle Transactions data
			const file = data.csvFile?.[0];
			let rows: any[] = [];

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
						setProgress(60);

						rows = (results.data as any[]).map((row) => ({
							amount: row["Amount"],
							balance: row["Balance"],
							description: row["Description"],
              date: row["Posting Date"]
						}));
						pushTransactionsMutation.mutate(
							{
								bankAccountId: bankId,
								rows,
							},
							{
								onSuccess: async (insertedTransactions) => {
									setProgress(70);

									if (!!insertedTransactions) {
										const rows = insertedTransactions.result.map((row) => ({
											amount: data.roundUp - (Math.abs(Number(row.amount)) % data.roundUp),
											transactionId: row.id,
										}));

										createMultipleRoundUpMutation.mutate({ rows });
									}

									setProgress(100);
									router.push("/dashboard");

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
		} catch (error: any) {
			console.error("onboarding failed with error:", error);
		}
	};

	return (
		<Form {...form}>
			<div className="flex flex-col items-center gap-6">
				<div>
					<h1 className="text-xl font-bold">Let's get you started!</h1>
					<Progress value={progress} className="w-[100%]" />
				</div>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6"
				>
					<FormField
						control={form.control}
						name="bankName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bank Name</FormLabel>
								<FormControl>
									<Input placeholder="bank inc." {...field} />
								</FormControl>
								<FormDescription>
									Enter the name of your primary bank
								</FormDescription>
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
									This is the amount you'd like us to round up to, for automatic
									savings
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
								<FormLabel>Savings Goal</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="1000"
										prefix="$"
										{...field}
									/>
								</FormControl>
								<FormDescription>Your target savings amount</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="csvFile"
						render={({ field: { value, onChange, ...fieldProps } }) => (
							<FormItem>
								<FormLabel>Transactions File</FormLabel>
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

					<Button
						className="w-full"
						type="submit"
						disabled={pushTransactionsMutation.isPending}
					>
						{pushTransactionsMutation.isPending ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</div>
		</Form>
	);
}
