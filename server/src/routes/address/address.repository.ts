import { Inject, Injectable } from '@nestjs/common';
import { AddressType } from '@shared/models/address.model';
import { PrismaService } from '@shared/services/prisma.service';

type CreatedAddressType = Pick<
  AddressType,
  'province' | 'district' | 'ward' | 'detail' | 'userId'
>;

type UpdatedAddressType = CreatedAddressType;

export interface AddressRepository {
  save(data: CreatedAddressType);

  update(id: number, data: UpdatedAddressType);
}

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async save(data: CreatedAddressType): Promise<AddressType> {
    return await this.prismaService.address.create({
      data: {
        ...data,
      },
    });
  }
  async update(id: number, data: UpdatedAddressType) {
    return await this.prismaService.address.update({
      data: {
        ...data,
      },
      where: {
        id: id,
        userId: data.userId,
      },
    });
  }
}
