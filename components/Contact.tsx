export default function Contact() {
  return (
    <section>
      <h2 className="text-2xl mb-4">POST /contact</h2>

      <form className="space-y-4 max-w-md">
        <input
          className="w-full p-2 bg-black border border-yellow-500"
          placeholder="Name"
        />
        <input
          className="w-full p-2 bg-black border border-yellow-500"
          placeholder="Email"
        />
        <textarea
          className="w-full p-2 bg-black border border-yellow-500"
          placeholder="Message"
        />

        <button className="bg-yellow-500 text-black px-4 py-2 rounded glow">
          Send Request
        </button>
      </form>
    </section>
  );
}