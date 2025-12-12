export default function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <main>
      <h2>Profile - {params.username}</h2>
    </main>
  );
}