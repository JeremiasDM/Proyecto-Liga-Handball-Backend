import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Club } from "./clubes.entity";

@Injectable()
export class ClubesService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>
  ) {}

  async createClub(clubData: Partial<Club>) {
    const club = this.clubRepo.create(clubData);
    return this.clubRepo.save(club);
  }

  async findAll() {
    return this.clubRepo.find();
  }

  async updateClub(id: number, data: Partial<Club>) {
    await this.clubRepo.update(id, data);
    return this.clubRepo.findOne({ where: { id } });
  }

  async deleteClub(id: number) {
    await this.clubRepo.update(id, { activo: false });
    return { deleted: true };
  }
}
