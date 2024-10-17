import { Injectable } from "@nestjs/common";

@Injectable()
export class DemoMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    //Argumento del middleware
    //es posible agregar un try catch de ser necesario
    console.log("Request...");
    next();
  }
}
 