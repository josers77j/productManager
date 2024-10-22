import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { ResourceRepository } from '../repository/resource.repository';

@Injectable()
export class ResourceService {

  constructor(private readonly resourceRepository : ResourceRepository) {}

  async createResource(createResourceDto: CreateResourceDto) {
    try{
      const process =  await this.resourceRepository.createResource(createResourceDto);

      if(!process) throw new UnprocessableEntityException('Error creating resource');

      return { message: 'Resource created successfully' };
    }catch(error){
      if(error instanceof UnprocessableEntityException) throw error;

      throw new UnprocessableEntityException('Error creating resource');
    }
  }

  findAll() {
    return `This action returns all resource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
