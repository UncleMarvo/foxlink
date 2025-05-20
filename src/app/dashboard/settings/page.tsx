"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AppearanceSettings from "@/app/dashboard/settings/appearance-setting";
import IntegrationSettings from "@/app/dashboard/settings/integration-setting"; 
import AccountSettings from "@/app/dashboard/settings/account-setting";
import CampaignSettings from "@/app/dashboard/settings/campaign-setting"; 
/**
 * SettingsPage - Account settings for the user
 * Includes a Change Password form
 */
export default function SettingsPage() {

  return (
    <>
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings.
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="appearance"
        className="w-full bg-white rounded-lg shadow p-2 space-y-6 border border-gray-200"
      >
        <TabsList className="w-full">
          <TabsTrigger value="appearance" className="">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="integrations" className="">
            Integrations
          </TabsTrigger>
          <TabsTrigger value="account" className="">
            Account
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="">
            Campaigns
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appearance">
          <Card>
            <AppearanceSettings />
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <IntegrationSettings />
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <AccountSettings />
          </Card>
        </TabsContent>
        <TabsContent value="campaigns">
          <Card>
            <CampaignSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
