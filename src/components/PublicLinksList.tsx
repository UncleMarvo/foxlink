"use client";

/**
 * PublicLinksList - Client component to render public profile links with analytics tracking
 * Props: links (array of { id, title, url })
 */
export default function PublicLinksList({ links }: { links: { id: string; title: string; url: string }[] }) {
  if (!links || links.length === 0) {
    return <p className="text-gray-400 text-center">No links yet.</p>;
  }
  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      {links.map(link => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-4 bg-white rounded-lg shadow hover:bg-blue-50 transition text-center font-medium text-blue-700"
          onClick={async (e) => {
            // Fire-and-forget analytics POST request
            try {
              fetch('/api/analytics/click', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  linkId: link.id,
                  referrer: window.location.href,
                  country: null, // Could be set via geo-IP in the future
                  abTestGroup: null, // Could be set for experiments
                }),
              });
            } catch (err) {
              // Silently ignore analytics errors
            }
            // Navigation will proceed as normal
          }}
        >
          {link.title}
        </a>
      ))}
    </div>
  );
} 