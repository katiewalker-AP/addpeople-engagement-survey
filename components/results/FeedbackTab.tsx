import type { ResultsData } from '@/lib/types';

interface Props { data: ResultsData }

export default function FeedbackTab({ data }: Props) {
  const { feedbackItems } = data;

  return (
    <div className="space-y-5">
      {/* Anonymity note */}
      <div className="bg-[#f0f3ff] border border-[#c7d0f8] rounded-xl px-5 py-4 flex items-start gap-3">
        <svg className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 11H7V7h2v4zm0-6H7V3h2v2z" />
        </svg>
        <p className="font-sans text-sm text-electric-blue leading-relaxed">
          Responses are anonymous — no identifying information is collected.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-sans font-semibold text-deep-blue">Open Feedback</h2>
        <span className="font-sans text-sm text-[#4a5568]">{feedbackItems.length} responses</span>
      </div>

      {feedbackItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-8 text-center">
          <p className="font-sans text-[#4a5568] text-sm">No written feedback submitted yet.</p>
        </div>
      ) : (
        feedbackItems.map((item, i) => (
          <blockquote
            key={i}
            className="bg-white rounded-2xl border border-border p-5 pl-6 relative overflow-hidden"
          >
            {/* Orange left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange rounded-l-2xl" />
            <p className="font-sans text-deep-blue text-base leading-relaxed">{item.text}</p>
            {item.timestamp && (
              <p className="mt-3 text-xs font-sans text-[#999]">
                {formatDate(item.timestamp)}
              </p>
            )}
          </blockquote>
        ))
      )}
    </div>
  );
}

function formatDate(ts: string): string {
  try {
    return new Date(ts).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return ts;
  }
}
