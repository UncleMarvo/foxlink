"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/utils/cn";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaGithub,
  FaTwitch,
} from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";

const platforms = [
  {
    key: "twitter",
    label: "Twitter",
    icon: FaTwitter,
    placeholder: "Twitter URL or @username",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    placeholder: "Facebook URL or username",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    placeholder: "Instagram URL or @username",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    placeholder: "LinkedIn URL or username",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: FaYoutube,
    placeholder: "YouTube URL or channel",
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: FaTiktok,
    placeholder: "TikTok URL or @username",
  },
  {
    key: "github",
    label: "GitHub",
    icon: FaGithub,
    placeholder: "GitHub URL or username",
  },
  {
    key: "twitch",
    label: "Twitch",
    icon: FaTwitch,
    placeholder: "Twitch URL or username",
  },
];

const schema = z.object(
  Object.fromEntries(
    platforms.flatMap(({ key }) => [
      [`${key}_url`, z.string().optional()],
      [`${key}_visible`, z.boolean()],
    ])
  )
);

type IntegrationForm = z.infer<typeof schema>;

const defaultValues: IntegrationForm = Object.fromEntries(
  platforms.flatMap(({ key }) => [
    [`${key}_url`, ""],
    [`${key}_visible`, false],
  ])
) as IntegrationForm;

export default function IntegrationSettings() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IntegrationForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Load settings on mount
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/profile/social-media");
      if (res.ok) {
        const data = await res.json();
        reset(data);
      } else {
        toast.error("Failed to load social media settings.");
      }
    })();
  }, [reset]);

  // Save settings
  const onSubmit = async (values: IntegrationForm) => {
    const res = await fetch("/api/profile/social-media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast.success("Social media settings saved!");
    } else {
      toast.error("Failed to save social media settings.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect your social media accounts to your public link page.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {platforms.map(({ key, label, icon: Icon, placeholder }) => (
          <div
            key={key}
            className="flex items-center gap-4 border-b pb-4 last:border-b-0"
          >
            <Icon className="w-6 h-6 text-gray-500" />
            <Controller
              name={`${key}_url`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={placeholder}
                  className="flex-1"
                />
              )}
            />
            <Controller
              name={`${key}_visible`}
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Show</span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        ))}
        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </form>
  );
}
