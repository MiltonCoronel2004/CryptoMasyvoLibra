import DashboardClient from "./DahboardClient";

export const metadata = {
  title: "CryptoMasyvoLibra",
  icons: {
    icon: "./bitcoin.png",
  },
};

export default async function DashboardPage() {
  return <DashboardClient />;
}
