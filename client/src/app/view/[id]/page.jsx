import ViewClient from "./ViewClient";

export default async function ViewPage({ params }) {
  const { id } = await params;

  return <ViewClient id={id} />;
}
