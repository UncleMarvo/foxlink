"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/utils/cn";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup";
import ThemePreview from "@/components/ThemePreview";
import { themeNames, themes, ThemeName } from "@/app/context/ThemeContext";

const appearanceFormSchema = z.object({
  theme: z.enum(themeNames, {
    required_error: "Please select a theme.",
  }),
  fontSize: z.enum(["small", "medium", "large"], {
    required_error: "Please select a font size.",
  }),
  showBackgroundPattern: z.boolean(),
});
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const fontSizes = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

// Build theme options dynamically from ThemeContext
const themeOptions = themeNames.map((name) => ({
  value: name,
  label: name.replace(/([A-Z])/g, " $1").trim(), // e.g., OceanBreeze -> Ocean Breeze
  colors: themes[name],
}));

export default function AppearanceSetting() {
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "OceanBreeze",
      fontSize: "medium",
      showBackgroundPattern: false,
    },
    mode: "onChange",
  });

  // Load settings on mount
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/profile/appearance-settings");
      if (res.ok) {
        const data = await res.json();
        // Ensure theme is always a valid value
        const validThemes = ["OceanBreeze", "ForestRetreat", "Twilight", "Amber", "Azure", "Sunbeam"];
        const theme = validThemes.includes(data.theme) ? data.theme : "OceanBreeze";
        form.reset({
          theme,
          fontSize: data.font_size || "medium",
          showBackgroundPattern: data.show_background_pattern ?? false,
        });
      }
    })();
  }, [form]);

  // Save settings
  const onSubmit = async (values: AppearanceFormValues) => {
    console.log(`***** DEBUG: Appearance settings: ${JSON.stringify(values)}`);

    try {
      const res = await fetch("/api/profile/appearance-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: values.theme,
          font_size: values.fontSize,
          show_background_pattern: values.showBackgroundPattern,
        }),
      });
      if (res.ok) {
        toast.success("Appearance settings saved!");
      } else {
        toast.error("Failed to save appearance settings.");
      }
    } catch (error) {
      console.error("Error saving appearance settings:", error);
      toast.error("Failed to save appearance settings.");
    } finally {
    }
  };
  // For theme preview
  //const selectedTheme = watch("theme");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the appearance of your public link page. These settings
            affect how your public page looks to visitors.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Theme</FormLabel>
                <FormDescription>
                  Select the theme for your public link page.
                </FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-2"
                >
                  {themeOptions.map((theme) => (
                    <FormItem key={theme.value}>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer">
                        <FormControl>
                          <RadioGroupItem value={theme.value} className="sr-only" />
                        </FormControl>
                        <div className="h-40 w-20 sm:w-20 md:w-40 lg:w-full">
                          <ThemePreview
                            colors={{
                              background: theme.colors.background,
                              border: theme.colors.border,
                              text: theme.colors.text.primary,
                            }}
                            isSelected={form.watch("theme") === theme.value}
                          />
                        </div>
                        <span className="block w-full p-2 text-center font-normal bg-blue-100">
                          {theme.label}
                        </span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />

          {/* Background Pattern Toggle */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="showBackgroundPattern"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Show Background Pattern
                    </FormLabel>
                    <FormDescription>
                      Enable background patterns on your public page as part of
                      the theme, if available.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Font Size Selector */}
          <FormField
            control={form.control}
            name="fontSize"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Font Size</FormLabel>
                <FormDescription>
                  Choose the font size for your public link page.
                </FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-4 pt-2"
                >
                  {fontSizes.map((size) => (
                    <FormItem key={size.value} className="flex flex-col items-center cursor-pointer">
                      <FormLabel className={cn(
                        "flex flex-col items-center p-2 rounded border transition-all w-20 sm:w-12 md:w-15 lg:w-20",
                        field.value === size.value
                          ? "border-blue-600 bg-blue-50 shadow"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                      )}>
                        <FormControl>
                          <RadioGroupItem value={size.value} className="sr-only" />
                        </FormControl>
                        {/* Sample text in the corresponding size */}
                        <span
                          className={cn(
                            "block font-semibold",
                            size.value === "small" && "text-base",
                            size.value === "medium" && "text-xl",
                            size.value === "large" && "text-3xl"
                          )}
                        >
                          Aa
                        </span>
                        <span className="mt-1 text-sm sm:text-xs">{size.label}</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          {/* Show validation errors if any */}
          {form.formState.errors.theme && (
            <div className="text-red-500 text-sm mt-2">{form.formState.errors.theme.message}</div>
          )}
          {form.formState.errors.fontSize && (
            <div className="text-red-500 text-sm mt-2">{form.formState.errors.fontSize.message}</div>
          )}
        </CardFooter>
      </form>
    </Form>
  );
}
