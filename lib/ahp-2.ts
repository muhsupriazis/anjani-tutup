// Fungsi untuk membuat matriks perbandingan berpasangan
export function createPairwiseComparisonMatrix(followers: number, age: number, engagement: number): number[][] {
  // Buat matriks dengan ukuran 3x3 dan isi dengan nilai 1
  const matrix: number[][] = Array.from({ length: 3 }, () => Array(3).fill(1));

  // Tentukan nilai perbandingan antar kriteria berdasarkan skala yang diberikan
  matrix[0][1] = age / followers // Age vs Followers
  matrix[0][2] = engagement / followers // Engagement vs Followers
  matrix[1][2] = engagement / age // Engagement vs Age

  // Isi nilai perbandingan untuk kriteria yang saling berlawanan
  matrix[1][0] = 1 / matrix[0][1] // Invers dari Age vs Followers
  matrix[2][0] = 1 / matrix[0][2] // Invers dari Engagement vs Followers
  matrix[2][1] = 1 / matrix[1][2] // Invers dari Engagement vs Age

  return matrix;
}

export function createComparisonMatrixFollowers(influencers: any[]): number[][] {
  const matrixSize = influencers.length;
  const matrix: number[][] = [];

  for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < matrixSize; j++) {
          if (i === j) {
              // Jika kita membandingkan influencer dengan dirinya sendiri, maka beri nilai 1 (karena sama)
              matrix[i][j] = 1;
          } else {
              // Hitung perbandingan antara jumlah pengikut influencer i dengan influencer j
              matrix[i][j] = influencers[i].followers / influencers[j].followers;
          }
      }
  }
  return matrix;
}

export function createComparisonMatrixAge(influencers: any[]): number[][] {
  const matrixSize = influencers.length;
  const matrix: number[][] = [];

  for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < matrixSize; j++) {
          if (i === j) {
              // Jika kita membandingkan influencer dengan dirinya sendiri, maka beri nilai 1 (karena sama)
              matrix[i][j] = 1;
          } else {
              // Hitung perbandingan antara jumlah pengikut influencer i dengan influencer j
              matrix[i][j] = influencers[i].age / influencers[j].age;
          }
      }
  }
  return matrix;
}

export function createComparisonMatrixEngagement(influencers: any[]): number[][] {
  const matrixSize = influencers.length;
  const matrix: number[][] = [];
//   console.table(influencers)

  for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < matrixSize; j++) {
          if (i === j) {
              // Jika kita membandingkan influencer dengan dirinya sendiri, maka beri nilai 1 (karena sama)
              matrix[i][j] = 1;
          } else {
              // Hitung perbandingan antara jumlah pengikut influencer i dengan influencer j
              matrix[i][j] = influencers[i].engagement / influencers[j].engagement;
          }
      }
  }
//   console.table(matrix)
  return matrix;
}

export function calculateRelativeWeights(matrix: number[][]): number[] {
  const n = matrix.length;
  const weights: number[] = [];

  for (let i = 0; i < n; i++) {
      let product = 1;
      for (let j = 0; j < n; j++) {
          product *= matrix[i][j];
      }
      const root = Math.pow(product, 1 / n);
      weights.push(root);
  }

  const sum = weights.reduce((acc, val) => acc + val, 0);
  return weights.map(w => w / sum);
}

export function calculateFinalScores(influencers: any[], weights: number[]): any {
  const finalInfluencer = influencers.map((influencer: any, index: number) => {
      const score = ( 
          influencer.rFollowers * weights[0] +
          influencer.rAge * weights[1] +
          influencer.rEngagement * weights[2]
      );
      return {
          ...influencer,
          score
      };
  });
const result = finalInfluencer.sort((a: any, b: any) => b.score - a.score);
return result;
}

// Contoh penggunaan fungsi
// const followersScale = 1;
// const ageScale = 5;
// const engagementScale = 9;

// const pairwiseComparisonMatrix = createPairwiseComparisonMatrix(followersScale, ageScale, engagementScale);

// // Tampilkan matriks perbandingan berpasangan
// console.log("Matriks Perbandingan Berpasangan:");
// console.table(pairwiseComparisonMatrix);