import { useAuth } from "@/hooks/use-auth";
import Landing from "@/pages/info/Landing";
import Dashboard from "@/pages/user/Dashboard";

export default function Home() {
  const { user } = useAuth();

  return user ? <Dashboard /> : <Landing />;
}
