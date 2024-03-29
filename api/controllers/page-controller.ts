import { serveFile } from "https://deno.land/std@0.212.0/http/file_server.ts";
import { join } from "https://deno.land/std@0.212.0/path/mod.ts";
import { BaseController, Context } from "https://deno.land/x/deno_msj_controllers/mod.ts";

export default class PageController extends BaseController {

    public async handle(context: Context): Promise<Response> {
        if(context.isApiRequest)
            return super.handle(context);

        const pageDir = join(Deno.cwd(), "docs");
        let filePath = join(pageDir, context.url.pathname);
    
        try {
            if(Deno.statSync(filePath).isDirectory)
                filePath = join(filePath, "index.html");
    
            const response = await serveFile(context.request, filePath);
            return response;
            
        } catch (error) {
            return new Response(error, {status: 404});
        }
    }

}