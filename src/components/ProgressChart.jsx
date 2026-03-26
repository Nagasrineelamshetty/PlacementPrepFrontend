import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

export const DifficultyBarChart = ({ data }) => {
  const chartData = [
    { name: 'Easy', value: data?.easy || 0, fill: '#6ee7b7' },
    { name: 'Medium', value: data?.medium || 0, fill: '#fbbf24' },
    { name: 'Hard', value: data?.hard || 0, fill: '#fb7185' },
  ];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={chartData} barSize={32}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#8890aa', fontSize: 12, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#8890aa', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
        <Tooltip
          contentStyle={{ background: '#161a27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const CategoryRadarChart = ({ data }) => {
  if (!data || data.length === 0) return (
    <div className="empty-state" style={{ padding: '30px 20px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Solve problems to see radar chart</p>
    </div>
  );

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.06)" />
        <PolarAngleAxis dataKey="category" tick={{ fill: '#8890aa', fontSize: 11 }} />
        <Radar name="Solved" dataKey="count" stroke="#6ee7b7" fill="#6ee7b7" fillOpacity={0.15} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const ProgressChart = ({ stats }) => {
  const diffData = {
    easy: stats?.solvedByDifficulty?.EASY || 0,
    medium: stats?.solvedByDifficulty?.MEDIUM || 0,
    hard: stats?.solvedByDifficulty?.HARD || 0,
  };

  const radarData = Object.entries(stats?.solvedByCategory || {}).map(([k, v]) => ({
    category: k, count: v,
  }));

  return (
    <div style={styles.grid}>
      <div className="card">
        <h3 className="section-title" style={{ marginBottom: 16 }}>By Difficulty</h3>
        <DifficultyBarChart data={diffData} />
      </div>
      <div className="card">
        <h3 className="section-title" style={{ marginBottom: 16 }}>By Category</h3>
        <CategoryRadarChart data={radarData} />
      </div>
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
};

export default ProgressChart;
