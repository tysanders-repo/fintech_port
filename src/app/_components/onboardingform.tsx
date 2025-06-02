"use client"

import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Input} from "~/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"


function onSubmit(props: any) {
  console.log(props)
}


const FormSchema = z.object({
  bankName:    z.string()
                .min(2, "Bank name must be at least 2 characters long"),
  
  roundUp:     z.number()
                .positive("Round up must be a positive value")
                .int("Round up must be a whole number"),

  savingsGoal: z.number()
                .positive("Savings goal must be a positive value")
                .int("Savings goal must be a whole number"),
})


export function OnboardingForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bankName: "",
      roundUp: 1,
      savingsGoal: 1000,
    },
  })

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
                <Input placeholder="1" prefix="$" {...field} />
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
                <Input placeholder="1000" prefix="$" {...field} />
              </FormControl>
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
                <Input placeholder="1000" prefix="$" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

    </Form>
  );
}