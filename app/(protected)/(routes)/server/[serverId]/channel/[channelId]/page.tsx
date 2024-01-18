export default function Channel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  return <div>{params.channelId}</div>;
}
