import AuthContext from "./session-provider";

export interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: AccountLayoutProps) {
  return <AuthContext>{children}</AuthContext>;
}
