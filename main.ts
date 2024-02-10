import { Context } from "https://deno.land/x/deno_msj_controllers/mod.ts";
import PageController from "./api/controllers/page-controller.ts";

Deno.serve((request: Request): Promise<Response> => {
    const context = new Context(request);
    const pageController = new PageController();
    return pageController.handle(context);
});