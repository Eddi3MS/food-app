export function defaultImage(str?: string | null) {
  if (str) return str

  return process.env.EXPO_PUBLIC_DEFAULT_IMAGE
}
