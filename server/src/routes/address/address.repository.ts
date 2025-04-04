import { Injectable } from '@nestjs/common';
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

  countByUserId(userId: number);

  delete(id: number, userId: number);
}

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async save(data: CreatedAddressType) {
    return await this.prismaService.address.create({
      data: {
        ...data,
      },
      omit: {
        userId: true,
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
      omit: {
        userId: true,
      },
    });
  }

  async countByUserId(userId: number) {
    return this.prismaService.address.count({
      where: {
        userId: userId,
      },
    });
  }

  async delete(id: number, userId: number) {
    return this.prismaService.address.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
