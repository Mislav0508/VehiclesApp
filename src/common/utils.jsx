export const arrayOfArrays = (cars) => {
  let carsPerPage = 12
  let pages = Math.ceil(cars.length / carsPerPage)
  const newCars = Array.from({length: pages}, (value, index) => {
    const start = index * carsPerPage
    return cars.slice(start, start + carsPerPage)
  })
  return newCars
}