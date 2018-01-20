export const labels = {
  0: 'très calme',
  1: 'calme',
  2: 'détendu',
  3: 'convivial',
  4: 'dynamique',
}

export const colors = {
  0: "#3DCCC6",
  1: "#82B2FF",
  2: "#8F94FB",
  3: "#F772B4",
  4: "#F76767",
}

export const getLevel = (frequencyData) => {
  const voice_freq = frequencyData.slice(0,22) 
  
  voice_freq[0] = voice_freq[0]/10
  voice_freq[1] = voice_freq[1]*3
  voice_freq[2] = voice_freq[2]*7

  const mean = voice_freq.reduce((sum, current) => sum += current, 0) / (voice_freq.length)

  if (mean < 50) return 0
  if (mean < 90) return 1
  if (mean < 130) return 2
  if (mean < 180) return 3
  return 4
}
