import ViewClient from "./ViewClient";

export const metadata = {
  title: "View Crypto",
  icons: {
    icon: "../bitcoin.png",
  },
};

export default async function ViewPage({ params }) {
  const { id } = await params;

  return <ViewClient id={id} />;
}
