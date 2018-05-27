import namor from 'namor'

export default length => {
  const statusChance = Math.random()
  return Array.from({ length }, () => ({
    name: namor.generate({ words: 2, numbers: 0 }),
    last_name: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 1000)
  }))
}
