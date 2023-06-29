import { Categories, Games } from '@prisma/client'

export interface GamesData extends Games {
    Categories: Categories
}
