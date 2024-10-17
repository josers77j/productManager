import { PaginatedResult, PaginateOptions } from 'src/common/interfaces/pagination.interfaces';


export type PaginateFunction = <T, K>(model: any, args?: K, options?: PaginateOptions) => Promise<PaginatedResult<T>>;

export const paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
  return async (model, args: any = {}, options: PaginateOptions = {}) => {
    const page = Number(options.page || defaultOptions.page || 1);
    const perPage = Number(options.perPage || defaultOptions.perPage || 10);

    const skip = page > 0 ? perPage * (page - 1) : 0;

    // Ejecuta las consultas en paralelo
    const [total, data] = await Promise.all([
      model.count({ where: args.where }), // Cuenta el total de registros
      model.findMany({
        ...args,
        take: perPage,
        skip,  // Salta los resultados previos
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};
