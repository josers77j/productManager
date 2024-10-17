import { Injectable } from '@nestjs/common';
import { PaginatedResult, PaginateOptions } from 'src/common/interfaces/pagination.interfaces';

@Injectable()
export class PaginationService {
  async paginate<T, K>(
    model: any, // Aquí se recibe el modelo (User, Product, etc.)
    args: K, // Aquí van los argumentos de búsqueda o selección (where, select, orderBy)
    options: PaginateOptions
  ): Promise<PaginatedResult<T>> {
    const page = Number(options.page || 1);
    const perPage = Number(options.perPage || 10);
    const skip = page > 0 ? perPage * (page - 1) : 0;

    const [total, data] = await Promise.all([
      model.count({ where: args['where'] }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
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
  }
}
