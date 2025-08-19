import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schema types
import { 
  createMemberInputSchema, 
  updateMemberInputSchema, 
  getMemberInputSchema, 
  getMemberByCifInputSchema, 
  deleteMemberInputSchema 
} from './schema';

// Import handlers
import { createMember } from './handlers/create_member';
import { getMembers } from './handlers/get_members';
import { getMemberById } from './handlers/get_member_by_id';
import { getMemberByCif } from './handlers/get_member_by_cif';
import { updateMember } from './handlers/update_member';
import { deleteMember } from './handlers/delete_member';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Create a new cooperative member
  createMember: publicProcedure
    .input(createMemberInputSchema)
    .mutation(({ input }) => createMember(input)),
  
  // Get all cooperative members
  getMembers: publicProcedure
    .query(() => getMembers()),
  
  // Get a member by ID
  getMemberById: publicProcedure
    .input(getMemberInputSchema)
    .query(({ input }) => getMemberById(input)),
  
  // Get a member by CIF number
  getMemberByCif: publicProcedure
    .input(getMemberByCifInputSchema)
    .query(({ input }) => getMemberByCif(input)),
  
  // Update an existing member
  updateMember: publicProcedure
    .input(updateMemberInputSchema)
    .mutation(({ input }) => updateMember(input)),
  
  // Delete a member
  deleteMember: publicProcedure
    .input(deleteMemberInputSchema)
    .mutation(({ input }) => deleteMember(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();