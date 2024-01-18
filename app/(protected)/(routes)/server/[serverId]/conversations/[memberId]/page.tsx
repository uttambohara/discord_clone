export default function Conversation({
  params,
}: {
  params: { serverId: string; memberId: string };
}) {
  return <div>{params.memberId}</div>;
}
