import namor from 'namor'

export default length => {
  const statusChance = Math.random()
  return Array.from({ length }, () => ({
    nombre: namor.generate({ words: 1, numbers: 0 }),
    apellido: namor.generate({ words: 1, numbers: 0 }),
    edad: Math.floor(Math.random() * 1000)
  }))
}
