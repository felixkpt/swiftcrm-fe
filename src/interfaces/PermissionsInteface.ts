interface PermissionData {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  uri: string;
  title: string;
  icon: string | null;
  hidden: number;
  user_id: number;
  status: number;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}

interface RoleData {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  status: number;
}

interface Route {
  uri: string;
  methods: string;
  uri_methods: string;
  slug: string;
  title: string;
  hidden: boolean;
  icon: string | null;
}

interface RoutesSection {
  folder: string;
  routes: Route[];
  slug: string;
  title: string;
  hidden: boolean;
  icon: string | null;

  children: RoutesSection[];
}


//   export interface Route {
//     uri: string;
//     uri_methods: string;
//     slug: string;
//     title: string;
//     folder: string;
//     hidden: boolean;
//     children?: {
//         routes: Route[];
//         children?: {
//             [key: string]: {
//                 routes: Route[];
//                 children?: {
//                     routes: Route[];
//                     children?: {
//                         [key: string]: {
//                             routes: Route[];
//                             children?: {
//                                 routes: Route[];
//                             };
//                         };
//                     };
//                 };
//             };
//         };
//     };
// }