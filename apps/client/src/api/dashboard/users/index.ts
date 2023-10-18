/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    query?: {
      page?: number | undefined
      limit?: number | undefined
    } | undefined

    status: 200
    resBody: Types.GetUsersResponse
  }
}
