'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ResultsData } from '@/lib/types';
import ResultsHeader from './ResultsHeader';
import OverviewTab from './OverviewTab';
import EngagementScoresTab from './EngagementScoresTab';
import TeamBreakdownTab from './TeamBreakdownTab';
import ENPSTab from './ENPSTab';
import FeedbackTab from './FeedbackTab';

const TABS = ['Overview', 'Engagement Scores', 'Team Breakdown', 'eNPS', 'Feedback'] as const;
type Tab = typeof TABS[number];

const MIN_RESPONSES = 5;

interface Props {
  userName:  string;
  userEmail: string;
}

export default function ResultsDashboard({ userName, userEmail }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [data, setData]           = useState<ResultsData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/results');
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json() as ResultsData;
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load results');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60_000);
    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-cream">
      <ResultsHeader
        userName={userName}
        responseCount={data?.totalResponses ?? 0}
        loading={loading}
      />

      {/* Tabs */}
      <div className="bg-white border-b border-border sticky top-[70px] z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'px-4 py-4 font-sans text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                activeTab === tab
                  ? 'border-electric-blue text-electric-blue'
                  : 'border-transparent text-[#4a5568] hover:text-deep-blue',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading && <LoadingSkeleton />}

        {error && !loading && (
          <div className="flex flex-col items-center py-16 gap-4">
            <p className="font-sans text-[#4a5568]">{error}</p>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-deep-blue text-white font-sans rounded-xl text-sm hover:opacity-90"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && data && data.totalResponses < MIN_RESPONSES && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f0f3ff] border-2 border-electric-blue flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-electric-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-deep-blue mb-3">Not enough responses yet</h2>
            <p className="font-sans text-[#4a5568] max-w-sm text-sm leading-relaxed">
              Results will appear once at least {MIN_RESPONSES} responses have been submitted. There
              are currently <strong>{data.totalResponses}</strong> {data.totalResponses === 1 ? 'response' : 'responses'}.
            </p>
          </div>
        )}

        {!loading && !error && data && data.totalResponses >= MIN_RESPONSES && (
          <>
            {activeTab === 'Overview'          && <OverviewTab data={data} />}
            {activeTab === 'Engagement Scores' && <EngagementScoresTab data={data} />}
            {activeTab === 'Team Breakdown'    && <TeamBreakdownTab data={data} />}
            {activeTab === 'eNPS'              && <ENPSTab data={data} />}
            {activeTab === 'Feedback'          && <FeedbackTab data={data} />}
          </>
        )}
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 pt-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-border p-6">
          <div className="h-4 bg-border rounded w-1/4 mb-4" />
          <div className="h-8 bg-border rounded w-1/2 mb-3" />
          <div className="h-4 bg-border rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
