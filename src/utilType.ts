export type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
export type KeysNotMatching<T, V> = { [K in keyof T]: T[K] extends V ? never : K }[keyof T]
export type RequireOne<T> = T & { [P in keyof T]: Required<Pick<T, P>> }[keyof T]

export type CustomViewport = 'sm' | 'md' | 'lg'
