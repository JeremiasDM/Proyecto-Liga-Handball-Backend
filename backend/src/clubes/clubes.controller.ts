import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ClubesService } from "./clubes.service";
import { Club } from "./clubes.entity";

@Controller("clubes")
export class ClubesController {
  constructor(private readonly service: ClubesService) {}

  @Post()
  async createClub(@Body() clubData: Partial<Club>) {
    return this.service.createClub(clubData);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Put(":id")
  async updateClub(@Param("id") id: string, @Body() data: Partial<Club>) {
    return this.service.updateClub(+id, data);
  }

  @Delete(":id")
  async deleteClub(@Param("id") id: string) {
    return this.service.deleteClub(+id);
  }
}
