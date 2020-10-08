import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.8.0
 * Query Engine version: e6c9b4b2b7fa162d0d459d1863321f547498fcfe
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Authors
 * const authors = await prisma.author.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Authors
   * const authors = await prisma.author.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.author`: Exposes CRUD operations for the **Author** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authors
    * const authors = await prisma.author.findMany()
    * ```
    */
  get author(): AuthorDelegate;

  /**
   * `prisma.book`: Exposes CRUD operations for the **Book** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.book.findMany()
    * ```
    */
  get book(): BookDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const AuthorDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  age: 'age'
};

export declare type AuthorDistinctFieldEnum = (typeof AuthorDistinctFieldEnum)[keyof typeof AuthorDistinctFieldEnum]


export declare const BookDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  genre: 'genre',
  authorId: 'authorId'
};

export declare type BookDistinctFieldEnum = (typeof BookDistinctFieldEnum)[keyof typeof BookDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model Author
 */

export type Author = {
  id: string
  name: string | null
  age: number
}


export type AggregateAuthor = {
  count: number
  avg: AuthorAvgAggregateOutputType | null
  sum: AuthorSumAggregateOutputType | null
  min: AuthorMinAggregateOutputType | null
  max: AuthorMaxAggregateOutputType | null
}

export type AuthorAvgAggregateOutputType = {
  age: number
}

export type AuthorSumAggregateOutputType = {
  age: number
}

export type AuthorMinAggregateOutputType = {
  age: number
}

export type AuthorMaxAggregateOutputType = {
  age: number
}


export type AuthorAvgAggregateInputType = {
  age?: true
}

export type AuthorSumAggregateInputType = {
  age?: true
}

export type AuthorMinAggregateInputType = {
  age?: true
}

export type AuthorMaxAggregateInputType = {
  age?: true
}

export type AggregateAuthorArgs = {
  where?: AuthorWhereInput
  orderBy?: Enumerable<AuthorOrderByInput> | AuthorOrderByInput
  cursor?: AuthorWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AuthorDistinctFieldEnum>
  count?: true
  avg?: AuthorAvgAggregateInputType
  sum?: AuthorSumAggregateInputType
  min?: AuthorMinAggregateInputType
  max?: AuthorMaxAggregateInputType
}

export type GetAuthorAggregateType<T extends AggregateAuthorArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetAuthorAggregateScalarType<T[P]>
}

export type GetAuthorAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof AuthorAvgAggregateOutputType ? AuthorAvgAggregateOutputType[P] : never
}
    
    

export type AuthorSelect = {
  id?: boolean
  name?: boolean
  age?: boolean
  book?: boolean | FindManyBookArgs
}

export type AuthorInclude = {
  book?: boolean | FindManyBookArgs
}

export type AuthorGetPayload<
  S extends boolean | null | undefined | AuthorArgs,
  U = keyof S
> = S extends true
  ? Author
  : S extends undefined
  ? never
  : S extends AuthorArgs | FindManyAuthorArgs
  ? 'include' extends U
    ? Author  & {
      [P in TrueKeys<S['include']>]:
      P extends 'book'
      ? Array<BookGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Author ? Author[P]
: 
      P extends 'book'
      ? Array<BookGetPayload<S['select'][P]>> : never
    }
  : Author
: Author


export interface AuthorDelegate {
  /**
   * Find zero or one Author that matches the filter.
   * @param {FindOneAuthorArgs} args - Arguments to find a Author
   * @example
   * // Get one Author
   * const author = await prisma.author.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAuthorArgs>(
    args: Subset<T, FindOneAuthorArgs>
  ): CheckSelect<T, Prisma__AuthorClient<Author | null>, Prisma__AuthorClient<AuthorGetPayload<T> | null>>
  /**
   * Find the first Author that matches the filter.
   * @param {FindFirstAuthorArgs} args - Arguments to find a Author
   * @example
   * // Get one Author
   * const author = await prisma.author.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstAuthorArgs>(
    args: Subset<T, FindFirstAuthorArgs>
  ): CheckSelect<T, Prisma__AuthorClient<Author>, Prisma__AuthorClient<AuthorGetPayload<T>>>
  /**
   * Find zero or more Authors that matches the filter.
   * @param {FindManyAuthorArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Authors
   * const authors = await prisma.author.findMany()
   * 
   * // Get first 10 Authors
   * const authors = await prisma.author.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const authorWithIdOnly = await prisma.author.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAuthorArgs>(
    args?: Subset<T, FindManyAuthorArgs>
  ): CheckSelect<T, Promise<Array<Author>>, Promise<Array<AuthorGetPayload<T>>>>
  /**
   * Create a Author.
   * @param {AuthorCreateArgs} args - Arguments to create a Author.
   * @example
   * // Create one Author
   * const Author = await prisma.author.create({
   *   data: {
   *     // ... data to create a Author
   *   }
   * })
   * 
  **/
  create<T extends AuthorCreateArgs>(
    args: Subset<T, AuthorCreateArgs>
  ): CheckSelect<T, Prisma__AuthorClient<Author>, Prisma__AuthorClient<AuthorGetPayload<T>>>
  /**
   * Delete a Author.
   * @param {AuthorDeleteArgs} args - Arguments to delete one Author.
   * @example
   * // Delete one Author
   * const Author = await prisma.author.delete({
   *   where: {
   *     // ... filter to delete one Author
   *   }
   * })
   * 
  **/
  delete<T extends AuthorDeleteArgs>(
    args: Subset<T, AuthorDeleteArgs>
  ): CheckSelect<T, Prisma__AuthorClient<Author>, Prisma__AuthorClient<AuthorGetPayload<T>>>
  /**
   * Update one Author.
   * @param {AuthorUpdateArgs} args - Arguments to update one Author.
   * @example
   * // Update one Author
   * const author = await prisma.author.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AuthorUpdateArgs>(
    args: Subset<T, AuthorUpdateArgs>
  ): CheckSelect<T, Prisma__AuthorClient<Author>, Prisma__AuthorClient<AuthorGetPayload<T>>>
  /**
   * Delete zero or more Authors.
   * @param {AuthorDeleteManyArgs} args - Arguments to filter Authors to delete.
   * @example
   * // Delete a few Authors
   * const { count } = await prisma.author.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AuthorDeleteManyArgs>(
    args: Subset<T, AuthorDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Authors.
   * @param {AuthorUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Authors
   * const author = await prisma.author.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AuthorUpdateManyArgs>(
    args: Subset<T, AuthorUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Author.
   * @param {AuthorUpsertArgs} args - Arguments to update or create a Author.
   * @example
   * // Update or create a Author
   * const author = await prisma.author.upsert({
   *   create: {
   *     // ... data to create a Author
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Author we want to update
   *   }
   * })
  **/
  upsert<T extends AuthorUpsertArgs>(
    args: Subset<T, AuthorUpsertArgs>
  ): CheckSelect<T, Prisma__AuthorClient<Author>, Prisma__AuthorClient<AuthorGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyAuthorArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateAuthorArgs>(args: Subset<T, AggregateAuthorArgs>): Promise<GetAuthorAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Author.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__AuthorClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  book<T extends FindManyBookArgs = {}>(args?: Subset<T, FindManyBookArgs>): CheckSelect<T, Promise<Array<Book>>, Promise<Array<BookGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Author findOne
 */
export type FindOneAuthorArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
  /**
   * Filter, which Author to fetch.
  **/
  where: AuthorWhereUniqueInput
}


/**
 * Author findFirst
 */
export type FindFirstAuthorArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
  /**
   * Filter, which Author to fetch.
  **/
  where?: AuthorWhereInput
  orderBy?: Enumerable<AuthorOrderByInput> | AuthorOrderByInput
  cursor?: AuthorWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AuthorDistinctFieldEnum>
}


/**
 * Author findMany
 */
export type FindManyAuthorArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
  /**
   * Filter, which Authors to fetch.
  **/
  where?: AuthorWhereInput
  /**
   * Determine the order of the Authors to fetch.
  **/
  orderBy?: Enumerable<AuthorOrderByInput> | AuthorOrderByInput
  /**
   * Sets the position for listing Authors.
  **/
  cursor?: AuthorWhereUniqueInput
  /**
   * The number of Authors to fetch. If negative number, it will take Authors before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Authors.
  **/
  skip?: number
  distinct?: Enumerable<AuthorDistinctFieldEnum>
}


/**
 * Author create
 */
export type AuthorCreateArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
  /**
   * The data needed to create a Author.
  **/
  data: AuthorCreateInput
}


/**
 * Author update
 */
export type AuthorUpdateArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
  /**
   * The data needed to update a Author.
  **/
  data: AuthorUpdateInput
  /**
   * Choose, which Author to update.
  **/
  where: AuthorWhereUniqueInput
}


/**
 * Author updateMany
 */
export type AuthorUpdateManyArgs = {
  data: AuthorUpdateManyMutationInput
  where?: AuthorWhereInput
}


/**
 * Author upsert
 */
export type AuthorUpsertArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
  /**
   * The filter to search for the Author to update in case it exists.
  **/
  where: AuthorWhereUniqueInput
  /**
   * In case the Author found by the `where` argument doesn't exist, create a new Author with this data.
  **/
  create: AuthorCreateInput
  /**
   * In case the Author was found with the provided `where` argument, update it with this data.
  **/
  update: AuthorUpdateInput
}


/**
 * Author delete
 */
export type AuthorDeleteArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
  /**
   * Filter which Author to delete.
  **/
  where: AuthorWhereUniqueInput
}


/**
 * Author deleteMany
 */
export type AuthorDeleteManyArgs = {
  where?: AuthorWhereInput
}


/**
 * Author without action
 */
export type AuthorArgs = {
  /**
   * Select specific fields to fetch from the Author
  **/
  select?: AuthorSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AuthorInclude | null
}



/**
 * Model Book
 */

export type Book = {
  id: string
  name: string | null
  genre: string | null
  authorId: string
}


export type AggregateBook = {
  count: number
}



export type AggregateBookArgs = {
  where?: BookWhereInput
  orderBy?: Enumerable<BookOrderByInput> | BookOrderByInput
  cursor?: BookWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<BookDistinctFieldEnum>
  count?: true
}

export type GetBookAggregateType<T extends AggregateBookArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type BookSelect = {
  id?: boolean
  name?: boolean
  genre?: boolean
  authorId?: boolean
  author?: boolean | AuthorArgs
}

export type BookInclude = {
  author?: boolean | AuthorArgs
}

export type BookGetPayload<
  S extends boolean | null | undefined | BookArgs,
  U = keyof S
> = S extends true
  ? Book
  : S extends undefined
  ? never
  : S extends BookArgs | FindManyBookArgs
  ? 'include' extends U
    ? Book  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? AuthorGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Book ? Book[P]
: 
      P extends 'author'
      ? AuthorGetPayload<S['select'][P]> : never
    }
  : Book
: Book


export interface BookDelegate {
  /**
   * Find zero or one Book that matches the filter.
   * @param {FindOneBookArgs} args - Arguments to find a Book
   * @example
   * // Get one Book
   * const book = await prisma.book.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneBookArgs>(
    args: Subset<T, FindOneBookArgs>
  ): CheckSelect<T, Prisma__BookClient<Book | null>, Prisma__BookClient<BookGetPayload<T> | null>>
  /**
   * Find the first Book that matches the filter.
   * @param {FindFirstBookArgs} args - Arguments to find a Book
   * @example
   * // Get one Book
   * const book = await prisma.book.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstBookArgs>(
    args: Subset<T, FindFirstBookArgs>
  ): CheckSelect<T, Prisma__BookClient<Book>, Prisma__BookClient<BookGetPayload<T>>>
  /**
   * Find zero or more Books that matches the filter.
   * @param {FindManyBookArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Books
   * const books = await prisma.book.findMany()
   * 
   * // Get first 10 Books
   * const books = await prisma.book.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const bookWithIdOnly = await prisma.book.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyBookArgs>(
    args?: Subset<T, FindManyBookArgs>
  ): CheckSelect<T, Promise<Array<Book>>, Promise<Array<BookGetPayload<T>>>>
  /**
   * Create a Book.
   * @param {BookCreateArgs} args - Arguments to create a Book.
   * @example
   * // Create one Book
   * const Book = await prisma.book.create({
   *   data: {
   *     // ... data to create a Book
   *   }
   * })
   * 
  **/
  create<T extends BookCreateArgs>(
    args: Subset<T, BookCreateArgs>
  ): CheckSelect<T, Prisma__BookClient<Book>, Prisma__BookClient<BookGetPayload<T>>>
  /**
   * Delete a Book.
   * @param {BookDeleteArgs} args - Arguments to delete one Book.
   * @example
   * // Delete one Book
   * const Book = await prisma.book.delete({
   *   where: {
   *     // ... filter to delete one Book
   *   }
   * })
   * 
  **/
  delete<T extends BookDeleteArgs>(
    args: Subset<T, BookDeleteArgs>
  ): CheckSelect<T, Prisma__BookClient<Book>, Prisma__BookClient<BookGetPayload<T>>>
  /**
   * Update one Book.
   * @param {BookUpdateArgs} args - Arguments to update one Book.
   * @example
   * // Update one Book
   * const book = await prisma.book.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends BookUpdateArgs>(
    args: Subset<T, BookUpdateArgs>
  ): CheckSelect<T, Prisma__BookClient<Book>, Prisma__BookClient<BookGetPayload<T>>>
  /**
   * Delete zero or more Books.
   * @param {BookDeleteManyArgs} args - Arguments to filter Books to delete.
   * @example
   * // Delete a few Books
   * const { count } = await prisma.book.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends BookDeleteManyArgs>(
    args: Subset<T, BookDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Books.
   * @param {BookUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Books
   * const book = await prisma.book.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends BookUpdateManyArgs>(
    args: Subset<T, BookUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Book.
   * @param {BookUpsertArgs} args - Arguments to update or create a Book.
   * @example
   * // Update or create a Book
   * const book = await prisma.book.upsert({
   *   create: {
   *     // ... data to create a Book
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Book we want to update
   *   }
   * })
  **/
  upsert<T extends BookUpsertArgs>(
    args: Subset<T, BookUpsertArgs>
  ): CheckSelect<T, Prisma__BookClient<Book>, Prisma__BookClient<BookGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyBookArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateBookArgs>(args: Subset<T, AggregateBookArgs>): Promise<GetBookAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Book.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__BookClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends AuthorArgs = {}>(args?: Subset<T, AuthorArgs>): CheckSelect<T, Prisma__AuthorClient<Author | null>, Prisma__AuthorClient<AuthorGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Book findOne
 */
export type FindOneBookArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
  /**
   * Filter, which Book to fetch.
  **/
  where: BookWhereUniqueInput
}


/**
 * Book findFirst
 */
export type FindFirstBookArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
  /**
   * Filter, which Book to fetch.
  **/
  where?: BookWhereInput
  orderBy?: Enumerable<BookOrderByInput> | BookOrderByInput
  cursor?: BookWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<BookDistinctFieldEnum>
}


/**
 * Book findMany
 */
export type FindManyBookArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
  /**
   * Filter, which Books to fetch.
  **/
  where?: BookWhereInput
  /**
   * Determine the order of the Books to fetch.
  **/
  orderBy?: Enumerable<BookOrderByInput> | BookOrderByInput
  /**
   * Sets the position for listing Books.
  **/
  cursor?: BookWhereUniqueInput
  /**
   * The number of Books to fetch. If negative number, it will take Books before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Books.
  **/
  skip?: number
  distinct?: Enumerable<BookDistinctFieldEnum>
}


/**
 * Book create
 */
export type BookCreateArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
  /**
   * The data needed to create a Book.
  **/
  data: BookCreateInput
}


/**
 * Book update
 */
export type BookUpdateArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
  /**
   * The data needed to update a Book.
  **/
  data: BookUpdateInput
  /**
   * Choose, which Book to update.
  **/
  where: BookWhereUniqueInput
}


/**
 * Book updateMany
 */
export type BookUpdateManyArgs = {
  data: BookUpdateManyMutationInput
  where?: BookWhereInput
}


/**
 * Book upsert
 */
export type BookUpsertArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
  /**
   * The filter to search for the Book to update in case it exists.
  **/
  where: BookWhereUniqueInput
  /**
   * In case the Book found by the `where` argument doesn't exist, create a new Book with this data.
  **/
  create: BookCreateInput
  /**
   * In case the Book was found with the provided `where` argument, update it with this data.
  **/
  update: BookUpdateInput
}


/**
 * Book delete
 */
export type BookDeleteArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
  /**
   * Filter which Book to delete.
  **/
  where: BookWhereUniqueInput
}


/**
 * Book deleteMany
 */
export type BookDeleteManyArgs = {
  where?: BookWhereInput
}


/**
 * Book without action
 */
export type BookArgs = {
  /**
   * Select specific fields to fetch from the Book
  **/
  select?: BookSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: BookInclude | null
}



/**
 * Deep Input Types
 */


export type AuthorWhereInput = {
  AND?: AuthorWhereInput | Enumerable<AuthorWhereInput>
  OR?: AuthorWhereInput | Enumerable<AuthorWhereInput>
  NOT?: AuthorWhereInput | Enumerable<AuthorWhereInput>
  id?: StringFilter | string
  name?: StringNullableFilter | string | null
  age?: IntFilter | number
  book?: BookListRelationFilter
}

export type AuthorOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  age?: SortOrder
}

export type AuthorWhereUniqueInput = {
  id?: string
}

export type BookWhereInput = {
  AND?: BookWhereInput | Enumerable<BookWhereInput>
  OR?: BookWhereInput | Enumerable<BookWhereInput>
  NOT?: BookWhereInput | Enumerable<BookWhereInput>
  id?: StringFilter | string
  name?: StringNullableFilter | string | null
  genre?: StringNullableFilter | string | null
  authorId?: StringFilter | string
  author?: AuthorRelationFilter | AuthorWhereInput
}

export type BookOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  genre?: SortOrder
  authorId?: SortOrder
}

export type BookWhereUniqueInput = {
  id?: string
}

export type AuthorCreateInput = {
  id: string
  name?: string | null
  age: number
  book?: BookCreateManyWithoutAuthorInput
}

export type AuthorUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  age?: number | IntFieldUpdateOperationsInput
  book?: BookUpdateManyWithoutAuthorInput
}

export type AuthorUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  age?: number | IntFieldUpdateOperationsInput
}

export type BookCreateInput = {
  id: string
  name?: string | null
  genre?: string | null
  author: AuthorCreateOneWithoutBookInput
}

export type BookUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  genre?: string | NullableStringFieldUpdateOperationsInput | null
  author?: AuthorUpdateOneRequiredWithoutBookInput
}

export type BookUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  genre?: string | NullableStringFieldUpdateOperationsInput | null
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type BookListRelationFilter = {
  every?: BookWhereInput
  some?: BookWhereInput
  none?: BookWhereInput
}

export type AuthorRelationFilter = {
  is?: AuthorWhereInput
  isNot?: AuthorWhereInput
}

export type BookCreateManyWithoutAuthorInput = {
  create?: BookCreateWithoutAuthorInput | Enumerable<BookCreateWithoutAuthorInput>
  connect?: BookWhereUniqueInput | Enumerable<BookWhereUniqueInput>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type IntFieldUpdateOperationsInput = {
  set?: number
}

export type BookUpdateManyWithoutAuthorInput = {
  create?: BookCreateWithoutAuthorInput | Enumerable<BookCreateWithoutAuthorInput>
  connect?: BookWhereUniqueInput | Enumerable<BookWhereUniqueInput>
  set?: BookWhereUniqueInput | Enumerable<BookWhereUniqueInput>
  disconnect?: BookWhereUniqueInput | Enumerable<BookWhereUniqueInput>
  delete?: BookWhereUniqueInput | Enumerable<BookWhereUniqueInput>
  update?: BookUpdateWithWhereUniqueWithoutAuthorInput | Enumerable<BookUpdateWithWhereUniqueWithoutAuthorInput>
  updateMany?: BookUpdateManyWithWhereNestedInput | Enumerable<BookUpdateManyWithWhereNestedInput>
  deleteMany?: BookScalarWhereInput | Enumerable<BookScalarWhereInput>
  upsert?: BookUpsertWithWhereUniqueWithoutAuthorInput | Enumerable<BookUpsertWithWhereUniqueWithoutAuthorInput>
}

export type AuthorCreateOneWithoutBookInput = {
  create?: AuthorCreateWithoutBookInput
  connect?: AuthorWhereUniqueInput
}

export type AuthorUpdateOneRequiredWithoutBookInput = {
  create?: AuthorCreateWithoutBookInput
  connect?: AuthorWhereUniqueInput
  update?: AuthorUpdateWithoutBookDataInput
  upsert?: AuthorUpsertWithoutBookInput
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type BookCreateWithoutAuthorInput = {
  id: string
  name?: string | null
  genre?: string | null
}

export type BookUpdateWithWhereUniqueWithoutAuthorInput = {
  where: BookWhereUniqueInput
  data: BookUpdateWithoutAuthorDataInput
}

export type BookUpdateManyWithWhereNestedInput = {
  where: BookScalarWhereInput
  data: BookUpdateManyDataInput
}

export type BookScalarWhereInput = {
  AND?: BookScalarWhereInput | Enumerable<BookScalarWhereInput>
  OR?: BookScalarWhereInput | Enumerable<BookScalarWhereInput>
  NOT?: BookScalarWhereInput | Enumerable<BookScalarWhereInput>
  id?: StringFilter | string
  name?: StringNullableFilter | string | null
  genre?: StringNullableFilter | string | null
  authorId?: StringFilter | string
}

export type BookUpsertWithWhereUniqueWithoutAuthorInput = {
  where: BookWhereUniqueInput
  update: BookUpdateWithoutAuthorDataInput
  create: BookCreateWithoutAuthorInput
}

export type AuthorCreateWithoutBookInput = {
  id: string
  name?: string | null
  age: number
}

export type AuthorUpdateWithoutBookDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  age?: number | IntFieldUpdateOperationsInput
}

export type AuthorUpsertWithoutBookInput = {
  update: AuthorUpdateWithoutBookDataInput
  create: AuthorCreateWithoutBookInput
}

export type BookUpdateWithoutAuthorDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  genre?: string | NullableStringFieldUpdateOperationsInput | null
}

export type BookUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  genre?: string | NullableStringFieldUpdateOperationsInput | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
