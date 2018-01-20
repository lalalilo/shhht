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
  const freq_voice = frequencyData.slice(0,22) 
  
  freq_voice[0] = freq_voice[0]/10
  freq_voice[2] = freq_voice[2]*2
  freq_voice[2] = freq_voice[2]*5
  console.log(freq_voice)
  const mean = freq_voice.reduce((sum, current) => sum += current, 0) / (freq_voice.length)
  console.log(mean)
  
  if (mean < 40) return 0
  if (mean < 80) return 1
  if (mean < 120) return 2
  if (mean < 160) return 3
  return 4
}
