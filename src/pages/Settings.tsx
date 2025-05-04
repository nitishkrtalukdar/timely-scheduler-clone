
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title="Settings" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you want to be notified about your scheduled posts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email notifications</Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="post-success">Post success notifications</Label>
                  <Switch id="post-success" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="post-failure">Post failure notifications</Label>
                  <Switch id="post-failure" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your connected social media accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <Twitter className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-gray-500">@timelyapp</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-pink-100">
                      <Instagram className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-gray-500">@timelyapp</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-gray-500">TimeLy Page</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-500">TimeLy Company</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-timely-purple hover:bg-timely-dark-purple">
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
