import Header from "./header/header";
import ProtectedRoutes from "./authorization/protectedRoutes";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function Layout({ children }: any) {
  return (
    <div>
      <Header />
      <ProtectedRoutes>
        <main>{children}</main>
      </ProtectedRoutes>
    </div>
  );
}
