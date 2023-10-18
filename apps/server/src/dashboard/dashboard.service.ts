import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as day from 'dayjs';

import { GetUserDto } from './dto';

import { DEFAULT_PAGE_LIMIT } from '@/utils';

@Injectable()
export class DashboardService {
  constructor(private prismaClient: PrismaClient) {}

  async getSummary() {
    const [totalUser, totalActiveUser, listUniqueUsers] = await Promise.all([
      this.prismaClient.user.count(),
      this.prismaClient.user.count({
        where: { lastSessionTimestamp: { gte: day().startOf('day').toDate() } },
      }),
      this.prismaClient.userSession.findMany({
        where: {
          time: { gte: day().subtract(6, 'day').startOf('day').toDate() },
        },
        distinct: 'userId',
      }),
    ]);

    return {
      totalUser,
      totalActiveUser,
      averageActiveUser: listUniqueUsers.length / 7,
    };
  }

  async getUsers(getUserDto: GetUserDto) {
    const { page = 1, limit = DEFAULT_PAGE_LIMIT } = getUserDto ?? {};

    const [users, total] = await Promise.all([
      this.prismaClient.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        select: {
          id: true,
          name: true,
          email: true,
          createdDate: true,
          loginCount: true,
          lastSessionTimestamp: true,
          isRegisteredWithGoogle: true,
        },
        orderBy: { createdDate: 'desc' },
      }),
      this.prismaClient.user.count({}),
    ]);

    return {
      data: users,
      pagination: { total, page, limit },
    };
  }
}
