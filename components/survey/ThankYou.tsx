import { THANK_YOU } from '@/lib/questions';

export default function ThankYou() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-deep-blue px-6 py-4 flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-yellow flex-shrink-0" />
        <span className="font-serif text-white text-lg tracking-tight">
          Add People · Employee Engagement
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center screen-enter">
          {/* Animated check */}
          <div className="flex justify-center mb-8">
            <div className="circle-scale w-20 h-20 rounded-full bg-deep-blue flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                <path
                  className="check-path"
                  d="M10 20l7 7 13-14"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="font-serif text-3xl text-deep-blue mb-4">
            {THANK_YOU.heading}
          </h1>
          <p className="font-sans text-[#4a5568] text-base leading-relaxed">
            {THANK_YOU.body}
          </p>
        </div>
      </main>
    </div>
  );
}
