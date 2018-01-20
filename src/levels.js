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
  const mean = frequencyData.reduce((sum, current) => sum += current, 0) / frequencyData.length
  if (mean < 10) return 0
  if (mean < 30) return 1
  if (mean < 50) return 2
  if (mean < 70) return 3
  return 4
}
