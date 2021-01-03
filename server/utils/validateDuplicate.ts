import { User } from '../models/User'

interface Args {
    name?: string
    email?: string
}

export default async (args: Args): Promise<void> => {
  const duplicateUser = await User.findOne(args)
  if (duplicateUser) throw new Error(`Duplicate user key: ${Object.keys(args)}`)
}
