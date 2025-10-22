import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import {
  User,
  Mail,
  Lock,
  Briefcase,
  Building2,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Crown,
  Zap,
  Save,
  Loader2
} from "lucide-react";
import { CinemaBackground } from "@/components/visual/CinemaBackground";

export default function AccountSettings() {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Profile form state
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    occupation: user?.occupation || "",
    company: user?.company || "",
    yearsExperience: user?.yearsExperience || "",
    bio: user?.bio || "",
    website: user?.website || "",
    twitter: user?.twitter || "",
    instagram: user?.instagram || "",
    linkedin: user?.linkedin || "",
  });

  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Auth guard
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof profileData) => {
      return await apiRequest("PATCH", "/api/user/profile", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Could not update profile",
      });
    },
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: async (data: typeof passwordData) => {
      return await apiRequest("PATCH", "/api/user/password", data);
    },
    onSuccess: () => {
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Password update failed",
        description: error.message || "Could not update password",
      });
    },
  });

  if (!user) {
    return null;
  }

  const isPro = user.tier === "pro" || user.tier === "studio";

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters.",
      });
      return;
    }

    updatePasswordMutation.mutate(passwordData);
  };

  return (
    <CinemaBackground variant="default">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Account Settings
            </h1>
            <Badge 
              variant={isPro ? "default" : "secondary"}
              className={`${isPro ? 'bg-gradient-to-r from-primary to-chart-2' : ''}`}
              data-testid="badge-tier"
            >
              {user.tier === "studio" ? <><Crown className="w-3 h-3 mr-1" /> Studio</> : isPro ? <><Zap className="w-3 h-3 mr-1" /> Pro</> : "Free"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage your profile and account preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Account Information
              </CardTitle>
              <CardDescription>Your email and subscription tier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <div className="flex items-center gap-2 mt-2 p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm" data-testid="text-email">{user.email}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Current Plan</Label>
                <div className="flex items-center justify-between mt-2 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {user.tier === "free" && <span className="text-sm font-semibold">Free</span>}
                    {user.tier === "creator" && <span className="text-sm font-semibold">Creator</span>}
                    {user.tier === "pro" && <span className="text-sm font-semibold">Pro</span>}
                    {user.tier === "studio" && <span className="text-sm font-semibold">Studio</span>}
                  </div>
                  {!isPro && (
                    <Button size="sm" variant="outline" onClick={() => navigate("/upgrade")} data-testid="button-upgrade">
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Professional Profile
              </CardTitle>
              <CardDescription>Tell us about your work and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Display Name</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    placeholder="Your name"
                    data-testid="input-username"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select
                      value={profileData.occupation}
                      onValueChange={(value) => setProfileData({ ...profileData, occupation: value })}
                    >
                      <SelectTrigger data-testid="select-occupation">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cinematographer">Cinematographer</SelectItem>
                        <SelectItem value="colorist">Colorist</SelectItem>
                        <SelectItem value="editor">Video Editor</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="photographer">Photographer</SelectItem>
                        <SelectItem value="content_creator">Content Creator</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="hobbyist">Hobbyist</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Studio</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      placeholder="Freelance"
                      data-testid="input-company"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select
                    value={profileData.yearsExperience}
                    onValueChange={(value) => setProfileData({ ...profileData, yearsExperience: value })}
                  >
                    <SelectTrigger data-testid="select-experience">
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Just starting</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell us a bit about yourself..."
                    className="resize-none h-24"
                    data-testid="input-bio"
                  />
                </div>

                <Separator className="my-6" />

                <div>
                  <Label className="text-sm font-medium mb-3 block">Social & Web</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-xs flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Website
                      </Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        placeholder="https://yoursite.com"
                        data-testid="input-website"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="text-xs flex items-center gap-1">
                        <Twitter className="w-3 h-3" /> Twitter/X
                      </Label>
                      <Input
                        id="twitter"
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                        placeholder="@username"
                        data-testid="input-twitter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-xs flex items-center gap-1">
                        <Instagram className="w-3 h-3" /> Instagram
                      </Label>
                      <Input
                        id="instagram"
                        value={profileData.instagram}
                        onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                        placeholder="@username"
                        data-testid="input-instagram"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-xs flex items-center gap-1">
                        <Linkedin className="w-3 h-3" /> LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/username"
                        data-testid="input-linkedin"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-chart-2"
                  disabled={updateProfileMutation.isPending}
                  data-testid="button-save-profile"
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                    data-testid="input-current-password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    required
                    data-testid="input-new-password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    required
                    data-testid="input-confirm-password"
                    placeholder="••••••••"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full"
                  disabled={updatePasswordMutation.isPending}
                  data-testid="button-update-password"
                >
                  {updatePasswordMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card>
            <CardContent className="pt-6">
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                data-testid="button-logout"
                className="w-full"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CinemaBackground>
  );
}
