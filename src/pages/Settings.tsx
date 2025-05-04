
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useChannelStore } from '@/stores/channelStore';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { connectedChannels, disconnectChannel } = useChannelStore();
  const navigate = useNavigate();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  const handleDisconnect = (platform: string) => {
    disconnectChannel(platform);
    toast({
      title: "Account disconnected",
      description: `Your ${platform} account has been disconnected.`,
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col">
        <Header title="Settings" />
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600 mb-8">Please sign in to access your settings</p>
            <Button onClick={() => navigate('/login')} className="bg-timely-purple hover:bg-timely-dark-purple">
              Sign In
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header title="Settings" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your TimeLy account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>Sign Out</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        
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
                      {connectedChannels.includes('twitter') ? (
                        <p className="text-sm text-gray-500">@{user?.name.toLowerCase()}</p>
                      ) : (
                        <p className="text-sm text-gray-500">Not connected</p>
                      )}
                    </div>
                  </div>
                  {connectedChannels.includes('twitter') ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDisconnect('twitter')}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/channels/twitter')}
                    >
                      Connect
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-pink-100">
                      <Instagram className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      {connectedChannels.includes('instagram') ? (
                        <p className="text-sm text-gray-500">@{user?.name.toLowerCase()}</p>
                      ) : (
                        <p className="text-sm text-gray-500">Not connected</p>
                      )}
                    </div>
                  </div>
                  {connectedChannels.includes('instagram') ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDisconnect('instagram')}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/channels/instagram')}
                    >
                      Connect
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook</p>
                      {connectedChannels.includes('facebook') ? (
                        <p className="text-sm text-gray-500">TimeLy Page</p>
                      ) : (
                        <p className="text-sm text-gray-500">Not connected</p>
                      )}
                    </div>
                  </div>
                  {connectedChannels.includes('facebook') ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDisconnect('facebook')}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/channels/facebook')}
                    >
                      Connect
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      {connectedChannels.includes('linkedin') ? (
                        <p className="text-sm text-gray-500">TimeLy Company</p>
                      ) : (
                        <p className="text-sm text-gray-500">Not connected</p>
                      )}
                    </div>
                  </div>
                  {connectedChannels.includes('linkedin') ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDisconnect('linkedin')}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/channels/linkedin')}
                    >
                      Connect
                    </Button>
                  )}
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
