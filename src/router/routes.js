const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("pages/LoginPage.vue"),
    meta: {
      title: "LOGIN",
      requireAuth: false,
      notAuth: true,
    },
    beforeEnter(to, from, next) {
      const user = JSON.parse(localStorage.getItem("user") || null);

      if (!user) {
        next();
        return;
      }
      console.log(user, "asdfa");
      next("/inicio");
    },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/inicio",
        name: "Inicio",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          title: "INICIO",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/equipos",
        name: "Equipos",
        component: () => import("pages/Equipos/EquiposPage.vue"),
        meta: {
          title: "Equipos",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/roles",
        name: "Roles",
        component: () => import("pages/Roles/RolesPage.vue"),
        meta: {
          title: "Roles",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/usuarios",
        name: "Usuarios",
        component: () => import("pages/Usuarios/UsuariosPage.vue"),
        meta: {
          title: "Usuarios",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/ambientes",
        name: "Ambientes",
        component: () => import("pages/Ambientes/AmbientesPage.vue"),
        meta: {
          title: "Ambientes",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/discos",
        name: "Discos",
        component: () => import("pages/Discos/DiscosPage.vue"),
        meta: {
          title: "Discos",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/marcas",
        name: "Marcas",
        component: () => import("pages/Marcas/MarcasPage.vue"),
        meta: {
          title: "Marcas",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/modelos",
        name: "Modelos",
        component: () => import("pages/Modelos/ModelosPage.vue"),
        meta: {
          title: "Modelos",
          requireAuth: true,
          notAuth: false,
        },
      },
      {
        path: "/sedes",
        name: "Sedes",
        component: () => import("pages/Sedes/SedesPage.vue"),
        meta: {
          title: "Sedes",
          requireAuth: true,
          notAuth: false,
        },
      },
    ],
    beforeEnter(to, from, next) {
      console.log(to, "asdfjalskfjaksld");
      const user = JSON.parse(localStorage.getItem("user") || null);

      if (!user) {
        next("/login");
        return;
      }
      console.log(user, "asdfa");
      next();
    },
    /**path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],*/
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
