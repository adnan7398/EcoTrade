import React, { useEffect, useState } from 'react';
import { Trophy, Award, Users, Info } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { firestore } from '../services/firebase';

const LeaderboardPage: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await firestore.leaderboard.getEntries();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);
  
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Green Leaderboard</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Celebrating our community members who are making the biggest positive impact on the environment through their sustainable shopping choices.
          </p>
        </div>
        
        {loading ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 animate-pulse">
              <div className="h-8 bg-neutral-200 rounded w-1/4 mb-6"></div>
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4 py-4 border-b border-neutral-100">
                  <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-6 bg-neutral-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Top 3 users */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {entries.slice(0, 3).map((entry, index) => (
                <div key={entry.userId} className={`
                  card p-6 text-center transform hover:-translate-y-1 transition-all duration-300
                  ${index === 0 ? 'bg-accent-50 border-2 border-accent-300 shadow-lg' : 'bg-white'}
                `}>
                  <div className="flex justify-center mb-4">
                    {index === 0 ? (
                      <Trophy className="h-12 w-12 text-accent-600" />
                    ) : index === 1 ? (
                      <Award className="h-12 w-12 text-secondary-600" />
                    ) : (
                      <Users className="h-12 w-12 text-primary-600" />
                    )}
                  </div>
                  
                  <div className="w-20 h-20 rounded-full bg-neutral-100 mx-auto mb-4 overflow-hidden">
                    {entry.photoURL ? (
                      <img src={entry.photoURL} alt={entry.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-800 text-xl font-semibold">
                        {entry.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">{entry.displayName}</h3>
                  
                  <div className="text-sm text-neutral-500 mb-4">
                    {index === 0 ? '🥇 1st Place' : index === 1 ? '🥈 2nd Place' : '🥉 3rd Place'}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-primary-700">{entry.points}</div>
                      <div className="text-xs text-neutral-500">Eco Points</div>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-success-700">{entry.carbonSaved}kg</div>
                      <div className="text-xs text-neutral-500">CO₂ Saved</div>
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <div className="text-xs bg-accent-100 text-accent-700 py-1 px-2 rounded-full inline-block mt-2">
                      Top Contributor This Month
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary-600" />
                  Full Leaderboard
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="py-3 px-4 text-left text-sm font-medium text-neutral-500">Rank</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-neutral-500">User</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-neutral-500">Eco Points</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-neutral-500">CO₂ Saved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, index) => (
                        <tr key={entry.userId} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <span className="font-medium">#{index + 1}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-neutral-100 overflow-hidden mr-3">
                                {entry.photoURL ? (
                                  <img src={entry.photoURL} alt={entry.displayName} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-800 text-sm font-semibold">
                                    {entry.displayName.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <span className="font-medium">{entry.displayName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-primary-700">{entry.points}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-success-700">{entry.carbonSaved}kg</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Info box */}
            <div className="max-w-4xl mx-auto mt-8 bg-primary-50 border border-primary-100 rounded-lg p-4 flex">
              <Info className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-primary-800">
                <p className="font-medium mb-1">How are points calculated?</p>
                <p>
                  Eco points are earned by purchasing sustainable products and are based on the environmental impact of each product. 
                  Users receive 10 points for every $100 spent, plus bonus points for choosing products with low carbon footprints.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;