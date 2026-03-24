import Link from "next/link";

export default function ProjectCard({ project }: any) {
  return (
    <div className="border border-yellow-500 p-5 rounded-xl hover:glow transition">
      <h3 className="text-xl font-semibold">{project.title}</h3>

      <p className="text-gray-400 mt-2">{project.description}</p>

      <div className="flex gap-2 mt-3">
        {project.tags.map((tag: string) => (
          <span
            key={tag}
            className="text-xs border border-yellow-500 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="text-yellow-400 mt-4 inline-block"
      >
        View System →
      </Link>
    </div>
  );
}