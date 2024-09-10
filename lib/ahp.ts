// Define influencer interface
interface Influencer {
  name: string;
  followers: number;
  age: number;
  engagement: number;
  id?: number;
}

// Define criteria weights
const weights = {
  followers: 0.3,
  age: 0.4,
  engagement: 0.4
};

const input = {
  followers: 9,
  age: 9,
  engagement: 9
}

// Sample influencers data
const influencers: Influencer[] = [
  { name: "Influencer A", followers: 50000, age: 25, engagement: 0.05 },
  { name: "Influencer B", followers: 60000, age: 30, engagement: 0.08 },
  { name: "Influencer C", followers: 70000, age: 28, engagement: 0.06 }
];

// Function to calculate weighted score for each influencer



// Function to perform AHP
export function chooseInfluencer(influencers: Influencer[], weights: any): any {
  // Calculate total weighted scores
  const totalWeightedScores = influencers.map((influencer: Influencer): number => {
      // Normalize criteria values
      const maxFollowers = Math.max(...influencers.map(inf => inf.followers));
      const normalizedFollowers = influencer.followers / maxFollowers;
  
      const maxAge = Math.max(...influencers.map(inf => inf.age));
      const normalizedAge = 1 - (influencer.age / maxAge);
  
      const maxEngagement = Math.max(...influencers.map(inf => inf.engagement));
      const normalizedEngagement = influencer.engagement / maxEngagement;
  
      // Calculate weighted score
      return (
          normalizedFollowers * weights.followers +
          normalizedAge * weights.age +
          normalizedEngagement * weights.engagement
      );
  })
  const normalizedScores = totalWeightedScores.map(score => score / totalWeightedScores.reduce((a, b) => a + b, 0));
  const maxIndex = normalizedScores.indexOf(Math.max(...normalizedScores));
  return influencers[maxIndex].id;
}