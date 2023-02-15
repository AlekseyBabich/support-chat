import {ExtendableContext} from "koa";

export function GetToken(){
    return async (ctx: ExtendableContext) => {
        const authLoginLinkId: string = ctx.request.query.authLoginLinkId as string;
        if(authLoginLinkId){
            ctx.body  = {
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lI' +
                    'iwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                'refreshToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4' +
                    'gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                'authLoginLinkId': authLoginLinkId,
            }
            return;
        }
        ctx.body = ({ 'body': 'no authLoginLinkId' });
        return;
    }
}
