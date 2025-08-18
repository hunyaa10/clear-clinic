export type Doctor = {
  id: number
  name: string
  title: string
  specialty: string
  image: string
  isChief?: boolean
  filmography?: {
    education?: string[]
    experience?: string[]
  }
}
