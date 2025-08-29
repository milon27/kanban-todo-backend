import { z } from "zod"

export const IdNumParamDto = z
    .object({
        id: z.string(),
    })
    .strict()

export type IIdNumParamDto = z.infer<typeof IdNumParamDto>
