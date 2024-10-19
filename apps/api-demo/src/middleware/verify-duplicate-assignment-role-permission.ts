import { Injectable } from "@nestjs/common";
import { CreateRolePermissionDto } from "src/domain/roles/dto/createRolePermission.dto";

@Injectable()
export class DemoMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    //Argumento del middleware
    //es posible agregar un try catch de ser necesario
    const { roleId, permissionId } = req.body as unknown as CreateRolePermissionDto;
    console.log("Request...", roleId, permissionId);
    next();
  }
}
 